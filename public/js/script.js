let clients = [];
let vehicles = [];
let vehicleYearMinimums = {};

const state = {
  filter: '',
  currentPage: 1,
  pageSize: 8,
};

async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (response.status === 204) return null;
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.message || 'Não foi possível concluir a operação.');
  return result;
}

async function loadData() {
  const [clientList, vehicleList] = await Promise.all([
    apiRequest('/api/clients'),
    apiRequest('/api/vehicles'),
  ]);
  clients = Array.isArray(clientList) ? clientList : [];
  vehicles = Array.isArray(vehicleList) ? vehicleList : [];
}

const titles = {
  dashboard: ['Dashboard', 'Visão geral da oficina'],
  clients: ['Clientes', 'Gerencie os clientes cadastrados na oficina.'],
  vehicles: ['Veículos', 'Gerencie os veículos cadastrados na oficina.'],
};

function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getClientById(id) {
  return clients.find((client) => client.id === id) || null;
}

function getVehicleById(id) {
  return vehicles.find((vehicle) => vehicle.id === id) || null;
}

function getVehicleOwner(vehicleId) {
  const vehicle = getVehicleById(vehicleId);
  if (!vehicle) return null;
  return getClientById(vehicle.client_id);
}

function getVehicleListByClient(clientId) {
  return vehicles.filter((vehicle) => vehicle.client_id === clientId);
}

function getStatusLabel(active) {
  return active ? 'Ativo' : 'Inativo';
}

function getBadgeClass(active) {
  return active ? 'success' : 'danger';
}

function formatPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`;
  }
  if (digits.length === 10) {
    return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`;
  }
  return value || '—';
}

function formatPhoneInput(value) {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

const validBrazilianDdds = new Set([
  '11', '12', '13', '14', '15', '16', '17', '18', '19', '21', '22', '24', '27', '28',
  '31', '32', '33', '34', '35', '37', '38', '41', '42', '43', '44', '45', '46', '47', '48', '49',
  '51', '53', '54', '55', '61', '62', '63', '64', '65', '66', '67', '68', '69',
  '71', '73', '74', '75', '77', '79', '81', '82', '83', '84', '85', '86', '87', '88', '89',
  '91', '92', '93', '94', '95', '96', '97', '98', '99',
]);

function getPhoneValidationMessage(value) {
  const phone = String(value || '');
  if (!/^[\d()\s-]+$/.test(phone)) return 'Informe um telefone válido no formato (99) 99999-9999.';
  const digits = phone.replace(/\D/g, '');
  if (!/^\d{11}$/.test(digits)) return 'Informe um telefone válido no formato (99) 99999-9999.';
  if (!validBrazilianDdds.has(digits.slice(0, 2))) return 'Informe um DDD brasileiro válido.';
  if (digits[2] !== '9') return 'Informe um telefone válido no formato (99) 99999-9999.';
  return null;
}

function normalizeLicensePlate(value) {
  return String(value || '').trim().slice(0, 7).toUpperCase();
}

function isValidLicensePlate(value) {
  return /^[A-Z]{3}(?:\d{4}|\d[A-Z]\d{2})$/.test(value);
}

function renderDatalistOptions(options) {
  return options.map((option) => `<option value="${escapeHtml(option)}"></option>`).join('');
}

function getYearSuggestions(minimum, maximum) {
  const years = [];
  for (let year = maximum; year >= minimum; year -= 1) years.push(String(year));
  return years;
}

function getVehicleYearMinimum(brand, model) {
  const brandEntry = Object.entries(vehicleYearMinimums).find(([name]) => normalize(name) === normalize(brand));
  if (!brandEntry) return null;

  const modelEntry = Object.entries(brandEntry[1]).find(([name]) => normalize(name) === normalize(model));
  if (!modelEntry) return null;

  return { brand: brandEntry[0], model: modelEntry[0], year: modelEntry[1] };
}

function getVehicleCatalogBrand(brand) {
  return Object.keys(vehicleYearMinimums).find((name) => normalize(name) === normalize(brand)) || null;
}

function getVehicleModels(brand) {
  const catalogBrand = getVehicleCatalogBrand(brand);
  return catalogBrand ? Object.keys(vehicleYearMinimums[catalogBrand]) : [];
}

function getVehicleModelMismatch(brand, model) {
  const catalogBrand = Object.keys(vehicleYearMinimums).find((name) => normalize(name) === normalize(brand));
  if (!catalogBrand) return null;

  const modelOwners = Object.entries(vehicleYearMinimums).flatMap(([catalogBrand, models]) => {
    const catalogModel = Object.keys(models).find((name) => normalize(name) === normalize(model));
    return catalogModel ? [{ brand: catalogBrand, model: catalogModel }] : [];
  });

  if (!modelOwners.length || modelOwners.some((owner) => normalize(owner.brand) === normalize(brand))) return null;
  return { ...modelOwners[0], requestedBrand: catalogBrand };
}

function hasLetters(value) {
  return /\p{L}/u.test(value);
}

function hasLettersOrNumbers(value) {
  return /[\p{L}\p{N}]/u.test(value);
}

function isValidClientName(value) {
  return value.length <= 120 && hasLetters(value) && /^[\p{L}\p{M}\s'’.\-]+$/u.test(value);
}

function getRecentRecords(records, limit = 4) {
  return [...records]
    .sort((first, second) => new Date(second.created_at) - new Date(first.created_at))
    .slice(0, limit);
}

function formatRelativeTime(value) {
  const createdAt = new Date(value);
  if (Number.isNaN(createdAt.getTime())) return '';

  const elapsedMinutes = Math.max(0, Math.floor((Date.now() - createdAt.getTime()) / 60000));
  if (elapsedMinutes < 1) return 'agora';
  if (elapsedMinutes < 60) return `há ${elapsedMinutes} min`;

  const elapsedHours = Math.floor(elapsedMinutes / 60);
  if (elapsedHours < 24) return `há ${elapsedHours} h`;

  const elapsedDays = Math.floor(elapsedHours / 24);
  if (elapsedDays < 30) return `há ${elapsedDays} ${elapsedDays === 1 ? 'dia' : 'dias'}`;

  const elapsedMonths = Math.floor(elapsedDays / 30);
  if (elapsedMonths < 12) return `há ${elapsedMonths} ${elapsedMonths === 1 ? 'mês' : 'meses'}`;
  const elapsedYears = Math.floor(elapsedMonths / 12);
  return `há ${elapsedYears} ${elapsedYears === 1 ? 'ano' : 'anos'}`;
}

function getMonthlyChange(records) {
  const now = new Date();
  const thisMonth = records.filter((record) => {
    const createdAt = new Date(record.created_at);
    return createdAt.getFullYear() === now.getFullYear() && createdAt.getMonth() === now.getMonth();
  }).length;
  const previousMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const previousMonth = records.filter((record) => {
    const createdAt = new Date(record.created_at);
    return createdAt.getFullYear() === previousMonthDate.getFullYear()
      && createdAt.getMonth() === previousMonthDate.getMonth();
  }).length;

  if (previousMonth === 0) {
    return thisMonth > 0 ? `Novos este mês: ${thisMonth}` : '0% este mês';
  }

  const change = Math.round(((thisMonth - previousMonth) / previousMonth) * 100);
  return `${change > 0 ? '+' : ''}${change}% este mês`;
}

function getLastSevenDays() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - 6 + index);
    const countCreatedOnDay = (records) => records.filter((record) => {
      const createdAt = new Date(record.created_at);
      return !Number.isNaN(createdAt.getTime()) && createdAt.toDateString() === date.toDateString();
    }).length;

    return {
      date,
      clients: countCreatedOnDay(clients),
      vehicles: countCreatedOnDay(vehicles),
    };
  });
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function icon(name) {
  const icons = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    grid: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 11.5 12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 19v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1"/><circle cx="10" cy="7" r="3"/><path d="M20 19v-1a4 4 0 0 0-3-3.87"/><path d="M16 4.13a4 4 0 0 1 0 7.75"/></svg>',
    car: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 14h2l1.3-4.3A2 2 0 0 1 8.2 8h7.6a2 2 0 0 1 1.9 1.7L19 14h2"/><path d="M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/><path d="M5 14v-1.5A1.5 1.5 0 0 1 6.5 11h11A1.5 1.5 0 0 1 19 12.5V14"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
    view: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/></svg>',
    arrowRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></svg>',
    arrowLeft: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="m11 5-7 7 7 7"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    wrench: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a7 7 0 0 1-9.9 9.9L8 18l.8 1.2a2 2 0 0 0 2.8 0l1.5-1.5a2 2 0 0 0 0-2.8L12 14l1.8 1.8a7 7 0 0 1 9.9-9.9l-3.3 3.3"/></svg>'
  };

  return icons[name] || '';
}

function getRouteData() {
  const hash = location.hash || '#/dashboard';
  const cleaned = hash.replace(/^#\/?/, '');
  const [route, detailId] = cleaned.split('/');
  return { route: route || 'dashboard', detailId: detailId || null };
}

function renderHeader(route) {
  const titleInfo = titles[route] || ['Página não encontrada', 'Confira o endereço e tente novamente.'];
  document.getElementById('page-title').textContent = titleInfo[0];
  document.getElementById('page-subtitle').textContent = titleInfo[1];
  document.title = `${titleInfo[0]} · AutoService`;
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('selected', button.dataset.route === route);
  });
}

function closeSidebar() {
  document.body.classList.remove('menu-open');
  const toggle = document.querySelector('.menu-toggle');
  if (toggle) toggle.setAttribute('aria-expanded', 'false');
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${escapeHtml(message)}</span>
    <button type="button" class="icon-button" aria-label="Fechar notificação">${icon('close')}</button>
  `;
  toast.querySelector('button').addEventListener('click', () => toast.remove());
  document.getElementById('toasts').appendChild(toast);
  setTimeout(() => toast.remove(), 2800);
}

function renderDashboard() {
  const activeClients = clients.filter((client) => client.active === true).length;
  const activeVehicles = vehicles.filter((vehicle) => vehicle.active === true).length;
  const clientActivePercent = clients.length ? Math.round((activeClients / clients.length) * 100) : 0;
  const vehicleActivePercent = vehicles.length ? Math.round((activeVehicles / vehicles.length) * 100) : 0;
  const recentClients = getRecentRecords(clients);
  const recentVehicles = getRecentRecords(vehicles);
  const dailyRegistrations = getLastSevenDays();
  const maxDailyRegistrations = Math.max(1, ...dailyRegistrations.flatMap((day) => [day.clients, day.vehicles]));
  const hasRecentRegistrations = dailyRegistrations.some((day) => day.clients || day.vehicles);
  const inactiveVehicles = vehicles.length - activeVehicles;
  const vehicleActivePercentOfChart = vehicles.length ? (activeVehicles / vehicles.length) * 100 : 0;

  const markup = `
    <section class="stats-grid">
      <article class="stat-card">
        <div class="card-head"><span>Clientes</span><span class="card-icon">${icon('users')}</span></div>
        <strong>${clients.length}</strong>
        <small>${getMonthlyChange(clients)}</small>
      </article>
      <article class="stat-card">
        <div class="card-head"><span>Veículos</span><span class="card-icon">${icon('car')}</span></div>
        <strong>${vehicles.length}</strong>
        <small>${getMonthlyChange(vehicles)}</small>
      </article>
      <article class="stat-card success">
        <div class="card-head"><span>Clientes Ativos</span><span class="card-icon">${icon('users')}</span></div>
        <strong>${activeClients}</strong>
        <small>${clientActivePercent}% do total</small>
      </article>
      <article class="stat-card success">
        <div class="card-head"><span>Veículos Ativos</span><span class="card-icon">${icon('car')}</span></div>
        <strong>${activeVehicles}</strong>
        <small>${vehicleActivePercent}% do total</small>
      </article>
    </section>

    <section class="dashboard-panels">
      <article class="panel">
        <div class="panel-header">
          <h3>Cadastros nos últimos 7 dias</h3>
          <div class="legend-inline">
            <span><i class="series blue"></i>Clientes</span>
            <span><i class="series dark"></i>Veículos</span>
          </div>
        </div>
        <div class="bar-chart">
          ${dailyRegistrations.map((day) => {
            const weekday = day.date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
            const dateLabel = day.date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            const clientHeight = day.clients ? Math.max(8, (day.clients / maxDailyRegistrations) * 100) : 0;
            const vehicleHeight = day.vehicles ? Math.max(8, (day.vehicles / maxDailyRegistrations) * 100) : 0;
            return `
            <div class="chart-day">
              <div class="bars">
                <span class="bar blue" style="height:${clientHeight}%" title="${day.clients} cliente(s)"></span>
                <span class="bar dark" style="height:${vehicleHeight}%" title="${day.vehicles} veículo(s)"></span>
              </div>
              <label><span>${weekday}</span><small>${dateLabel}</small></label>
            </div>
          `;
          }).join('')}
        </div>
        ${hasRecentRegistrations ? '' : '<p class="chart-empty">Nenhum cadastro nos últimos 7 dias.</p>'}
      </article>

      <article class="panel donut-panel">
        <div class="panel-header">
          <h3>Status dos veículos</h3>
        </div>
        ${vehicles.length ? `
          <div class="donut-wrap">
            <div class="donut-chart" style="background: conic-gradient(var(--primary) 0 ${vehicleActivePercentOfChart}%, #dfe9f7 ${vehicleActivePercentOfChart}% 100%)">
              <div class="donut-inner">
                <strong>${vehicles.length}</strong>
                <span>Veículos</span>
              </div>
            </div>
          </div>
          <ul class="status-list">
            <li><span><span class="dot success"></span>Ativos</span><strong>${activeVehicles}</strong></li>
            <li><span><span class="dot danger"></span>Inativos</span><strong>${inactiveVehicles}</strong></li>
          </ul>
        ` : '<div class="empty-state"><h3>Nenhum veículo cadastrado.</h3><p>Os indicadores aparecerão após o primeiro cadastro.</p></div>'}
      </article>
    </section>

    <section class="content-grid">
      <article class="panel list-panel">
        <div class="panel-header">
          <h3>Clientes recentes</h3>
          <a class="text-link" href="#/clients">Ver todos ${icon('arrowRight')}</a>
        </div>
        <div class="mini-list">
          ${recentClients.length ? recentClients.map((client) => {
            const initials = client.name.split(' ').map((part) => part[0]).slice(0,2).join('').toUpperCase();
            return `
              <div class="mini-list-item">
                <div class="avatar">${initials}</div>
                <div class="mini-text">
                  <strong>${escapeHtml(client.name)}</strong>
                  <a href="mailto:${escapeHtml(client.email)}">${escapeHtml(client.email)}</a>
                  <span>${formatRelativeTime(client.created_at)}</span>
                </div>
              </div>
          `;
          }).join('') : '<div class="empty-state"><h3>Nenhum cliente cadastrado.</h3></div>'}
        </div>
      </article>

      <article class="panel list-panel">
        <div class="panel-header">
          <h3>Veículos recentes</h3>
          <a class="text-link" href="#/vehicles">Ver todos ${icon('arrowRight')}</a>
        </div>
        <div class="mini-list">
          ${recentVehicles.length ? recentVehicles.map((vehicle) => `
            <div class="mini-list-item">
              <div class="mini-car">${icon('car')}</div>
              <div class="mini-text">
                <strong>${escapeHtml(vehicle.model)}</strong>
                <span>${escapeHtml(vehicle.license_plate)}</span>
                <small>${formatRelativeTime(vehicle.created_at)}</small>
              </div>
            </div>
          `).join('') : '<div class="empty-state"><h3>Nenhum veículo cadastrado.</h3></div>'}
        </div>
      </article>
    </section>
  `;

  document.getElementById('content').innerHTML = markup;
}

function buildListPage(type) {
  const list = type === 'clients' ? clients : vehicles;
  const filtered = list.filter((item) => {
    const query = normalize(state.filter);
    if (!query) return true;

    if (type === 'clients') {
      const client = item;
      return normalize(`${client.name} ${client.email} ${client.phone}`).includes(query);
    }

    const vehicle = item;
    const owner = getClientById(vehicle.client_id)?.name || '';
    return normalize(`${vehicle.brand} ${vehicle.model} ${vehicle.license_plate} ${owner}`).includes(query);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / state.pageSize));
  if (state.currentPage > totalPages) state.currentPage = totalPages;

  const start = (state.currentPage - 1) * state.pageSize;
  const currentItems = filtered.slice(start, start + state.pageSize);

  const title = type === 'clients' ? 'Clientes' : 'Veículos';
  const buttonLabel = type === 'clients' ? 'Novo Cliente' : 'Novo Veículo';
  const emptyMessage = list.length === 0
    ? `Nenhum ${type === 'clients' ? 'cliente' : 'veículo'} cadastrado.`
    : 'Nenhum registro encontrado.';

  const tableRows = type === 'clients'
    ? currentItems.map((client) => `
        <tr>
          <td>
            <div class="customer-cell">
              <div class="avatar">${client.name.split(' ').map((part) => part[0]).slice(0,2).join('').toUpperCase()}</div>
              <div>
                <strong>${escapeHtml(client.name)}</strong>
              </div>
            </div>
          </td>
          <td>${escapeHtml(client.email)}</td>
          <td>${escapeHtml(formatPhone(client.phone))}</td>
          <td><span class="badge ${getBadgeClass(client.active)}"><span class="dot ${client.active ? 'success' : 'danger'}"></span>${getStatusLabel(client.active)}</span></td>
          <td class="actions-col">
            <div class="table-actions">
              <button type="button" class="row-action" data-action="view" data-entity="clients" data-id="${client.id}" aria-label="Visualizar cliente">${icon('view')}</button>
              <button type="button" class="row-action" data-action="edit" data-entity="clients" data-id="${client.id}" aria-label="Editar cliente">${icon('edit')}</button>
              <button type="button" class="row-action danger" data-action="delete" data-entity="clients" data-id="${client.id}" aria-label="Excluir cliente">${icon('trash')}</button>
            </div>
          </td>
        </tr>
      `).join('')
    : currentItems.map((vehicle) => {
        const owner = getClientById(vehicle.client_id);
        return `
          <tr>
            <td>
              <div class="vehicle-cell">
                <div class="mini-car">${icon('car')}</div>
                <div>
                  <strong>${escapeHtml(vehicle.model)}</strong>
                </div>
              </div>
            </td>
            <td>${escapeHtml(vehicle.brand)}</td>
            <td>${vehicle.year || '—'}</td>
            <td><span class="plate-tag">${escapeHtml(vehicle.license_plate)}</span></td>
            <td>${owner ? `<span class="owner-link">${escapeHtml(owner.name)}</span>` : '—'}</td>
            <td><span class="badge ${getBadgeClass(vehicle.active)}"><span class="dot ${vehicle.active ? 'success' : 'danger'}"></span>${getStatusLabel(vehicle.active)}</span></td>
            <td class="actions-col">
              <div class="table-actions">
                <button type="button" class="row-action" data-action="view" data-entity="vehicles" data-id="${vehicle.id}" aria-label="Visualizar veículo">${icon('view')}</button>
                <button type="button" class="row-action" data-action="edit" data-entity="vehicles" data-id="${vehicle.id}" aria-label="Editar veículo">${icon('edit')}</button>
                <button type="button" class="row-action danger" data-action="delete" data-entity="vehicles" data-id="${vehicle.id}" aria-label="Excluir veículo">${icon('trash')}</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

  const output = `
    <section class="page-header">
      <div>
        <h2>${title}</h2>
        <p>${type === 'clients' ? 'Gerencie os clientes cadastrados na oficina.' : 'Gerencie os veículos cadastrados na oficina.'}</p>
      </div>
      <button type="button" class="button primary" data-action="create" data-entity="${type}">${icon('plus')} ${buttonLabel}</button>
    </section>

    <article class="panel table-panel">
      <div class="list-toolbar">
        <label class="search-field">
          <span>${icon('search')}</span>
          <input id="search" type="search" placeholder="${type === 'clients' ? 'Pesquisar cliente...' : 'Pesquisar por marca, modelo ou placa...'}" value="${escapeHtml(state.filter)}" />
        </label>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              ${type === 'clients' ? '<th>Nome</th><th>E-mail</th><th>Telefone</th><th>Status</th><th class="actions-col">Ações</th>' : '<th>Veículo</th><th>Marca</th><th>Ano</th><th>Placa</th><th>Proprietário</th><th>Status</th><th class="actions-col">Ações</th>'}
            </tr>
          </thead>
          <tbody>
            ${tableRows || `<tr><td colspan="7"><div class="empty-state"><h3>${emptyMessage}</h3><p>${list.length === 0 ? 'Cadastre o primeiro registro para começar.' : 'Atualize a busca para continuar.'}</p></div></td></tr>`}
          </tbody>
        </table>
      </div>
      <div class="table-footer">
        <span id="record-count">Mostrando ${filtered.length ? start + 1 : 0} a ${Math.min(start + state.pageSize, filtered.length)} de ${filtered.length} ${type === 'clients' ? 'clientes' : 'veículos'}</span>
        <div class="pagination">
          <button type="button" class="page-button" data-page="prev" aria-label="Página anterior">${icon('arrowLeft')}</button>
          ${Array.from({ length: totalPages }, (_, idx) => `<button type="button" class="page-button ${idx + 1 === state.currentPage ? 'active' : ''}" data-page-number="${idx + 1}">${idx + 1}</button>`).join('')}
          <button type="button" class="page-button" data-page="next" aria-label="Próxima página">${icon('arrowRight')}</button>
        </div>
      </div>
    </article>
  `;

  document.getElementById('content').innerHTML = output;

  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', (event) => {
    state.filter = event.target.value;
    state.currentPage = 1;
    render();
  });

  document.querySelectorAll('[data-page-number]').forEach((button) => {
    button.addEventListener('click', () => {
      state.currentPage = Number(button.dataset.pageNumber);
      render();
    });
  });

  document.querySelector('[data-page="prev"]').addEventListener('click', () => {
    state.currentPage = Math.max(1, state.currentPage - 1);
    render();
  });

  document.querySelector('[data-page="next"]').addEventListener('click', () => {
    state.currentPage = Math.min(totalPages, state.currentPage + 1);
    render();
  });
}

function renderClientDetail(clientId) {
  const client = getClientById(clientId);
  if (!client) {
    document.getElementById('content').innerHTML = '<div class="empty-state"><h3>Cliente não encontrado.</h3></div>';
    return;
  }

  const vehicleList = getVehicleListByClient(client.id);
  const initials = client.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

  document.getElementById('content').innerHTML = `
    <section class="detail-header">
      <a class="back-link" href="#/clients">${icon('arrowLeft')} Voltar para clientes</a>
    </section>
    <section class="detail-layout">
      <article class="panel detail-panel">
        <div class="detail-top">
          <div class="avatar" style="width:52px;height:52px;border-radius:14px;font-size:15px;">${initials}</div>
          <div class="detail-title-group">
            <span class="eyebrow">Cliente</span>
            <h3>${escapeHtml(client.name)}</h3>
          </div>
        </div>
        <dl class="detail-grid">
          <div class="info-field"><dt>Nome</dt><dd>${escapeHtml(client.name)}</dd></div>
          <div class="info-field"><dt>Status</dt><dd><span class="badge ${getBadgeClass(client.active)}"><span class="dot ${client.active ? 'success' : 'danger'}"></span>${getStatusLabel(client.active)}</span></dd></div>
          <div class="info-field"><dt>E-mail</dt><dd>${escapeHtml(client.email)}</dd></div>
          <div class="info-field"><dt>Telefone</dt><dd>${escapeHtml(formatPhone(client.phone))}</dd></div>
          <div class="info-field"><dt>Cadastrado em</dt><dd>${formatDate(client.created_at)}</dd></div>
          <div class="info-field"><dt>Última atualização</dt><dd>${formatDate(client.updated_at)}</dd></div>
        </dl>
      </article>

      <article class="panel detail-list-panel">
        <div class="panel-header">
          <h3>Veículos do cliente</h3>
          <button type="button" class="button primary" data-action="create" data-entity="vehicles" data-client-id="${client.id}">${icon('plus')} Novo Veículo</button>
        </div>
        ${vehicleList.length
              ? `<div class="table-wrap"><table class="client-vehicles-table"><thead><tr><th>Veículo</th><th>Marca</th><th>Placa</th><th>Status</th><th class="actions-col">Ações</th></tr></thead><tbody>${vehicleList.map((vehicle) => `
              <tr>
                <td data-label="Veículo"><strong>${escapeHtml(vehicle.model)}</strong></td>
                <td data-label="Marca">${escapeHtml(vehicle.brand)}</td>
                <td data-label="Placa"><span class="plate-tag">${escapeHtml(vehicle.license_plate)}</span></td>
                <td data-label="Status"><span class="badge ${getBadgeClass(vehicle.active)}"><span class="dot ${vehicle.active ? 'success' : 'danger'}"></span>${getStatusLabel(vehicle.active)}</span></td>
                <td data-label="Ações" class="actions-col"><div class="table-actions"><button type="button" class="row-action" data-action="view" data-entity="vehicles" data-id="${vehicle.id}" aria-label="Visualizar veículo">${icon('view')}</button><button type="button" class="row-action" data-action="edit" data-entity="vehicles" data-id="${vehicle.id}" aria-label="Editar veículo">${icon('edit')}</button><button type="button" class="row-action danger" data-action="delete" data-entity="vehicles" data-id="${vehicle.id}" aria-label="Excluir veículo">${icon('trash')}</button></div></td>
              </tr>
            `).join('')}</tbody></table></div>`
          : '<div class="empty-state"><h3>Nenhum veículo cadastrado.</h3><p>Cadastre um veículo para este cliente.</p></div>'}
      </article>
    </section>
  `;
}

function renderVehicleDetail(vehicleId) {
  const vehicle = getVehicleById(vehicleId);
  if (!vehicle) {
    document.getElementById('content').innerHTML = '<div class="empty-state"><h3>Veículo não encontrado.</h3></div>';
    return;
  }

  const owner = getVehicleOwner(vehicle.id);

  document.getElementById('content').innerHTML = `
    <section class="detail-header">
      <a class="back-link" href="#/vehicles">${icon('arrowLeft')} Voltar para veículos</a>
    </section>
    <section class="detail-layout">
      <article class="panel detail-panel">
        <div class="detail-top">
          <div class="vehicle-illustration">${icon('car')}</div>
          <div class="detail-title-group">
            <span class="eyebrow">Veículo</span>
            <h3>${escapeHtml(vehicle.model)}</h3>
          </div>
        </div>
        <dl class="detail-grid">
          <div class="info-field"><dt>Marca</dt><dd>${escapeHtml(vehicle.brand)}</dd></div>
          <div class="info-field"><dt>Modelo</dt><dd>${escapeHtml(vehicle.model)}</dd></div>
          <div class="info-field"><dt>Ano</dt><dd>${vehicle.year || '—'}</dd></div>
          <div class="info-field"><dt>Placa</dt><dd><span class="plate-tag">${escapeHtml(vehicle.license_plate)}</span></dd></div>
          <div class="info-field"><dt>Status</dt><dd><span class="badge ${getBadgeClass(vehicle.active)}"><span class="dot ${vehicle.active ? 'success' : 'danger'}"></span>${getStatusLabel(vehicle.active)}</span></dd></div>
          <div class="info-field"><dt>Cadastrado em</dt><dd>${formatDate(vehicle.created_at)}</dd></div>
          <div class="info-field"><dt>Última atualização</dt><dd>${formatDate(vehicle.updated_at)}</dd></div>
          <div class="info-field"><dt>Proprietário</dt><dd>${owner ? escapeHtml(owner.name) : '—'}</dd></div>
        </dl>
      </article>

      <article class="panel detail-owner-panel">
        <div class="panel-header">
          <h3>Proprietário</h3>
        </div>
        ${owner ? `
          <div class="owner-box">
            <div class="avatar">${owner.name.split(' ').map((part) => part[0]).slice(0,2).join('').toUpperCase()}</div>
            <div class="owner-info">
              <strong>${escapeHtml(owner.name)}</strong>
              <span>${escapeHtml(owner.email)}</span>
              <span>${escapeHtml(formatPhone(owner.phone))}</span>
            </div>
          </div>
          <div class="modal-actions" style="padding:0 20px; justify-content:flex-start;">
            <button type="button" class="button secondary" data-action="view" data-entity="clients" data-id="${owner.id}">Ver cliente</button>
          </div>
        ` : '<div class="empty-state"><h3>Proprietário não localizado.</h3></div>'}
      </article>
    </section>
  `;
}

function openModal(type, mode, recordId = null, clientId = null) {
  const isClient = type === 'clients';
  let payload = null;
  if (recordId) {
    payload = isClient ? getClientById(recordId) : getVehicleById(recordId);
  }

  const title = mode === 'create'
    ? (isClient ? 'Cadastrar Cliente' : 'Cadastrar Veículo')
    : (isClient ? 'Editar Cliente' : 'Editar Veículo');
  const initialBrand = getVehicleCatalogBrand(payload?.brand);
  const initialModelSuggestions = getVehicleModels(initialBrand);
  const initialYearMinimum = getVehicleYearMinimum(payload?.brand, payload?.model);
  const initialYearMinimumValue = initialYearMinimum?.year || 1900;
  const maximumYear = new Date().getFullYear() + 1;
  const initialYearSuggestions = getYearSuggestions(initialYearMinimumValue, maximumYear);

  const formMarkup = isClient
    ? `
      <form class="modal-form" id="client-form">
        <div class="form-grid">
          <label class="form-field full-width">
            <span>Nome *</span>
            <input name="name" type="text" value="${escapeHtml(payload?.name || '')}" required />
          </label>
          <label class="form-field">
            <span>E-mail *</span>
            <input name="email" type="email" value="${escapeHtml(payload?.email || '')}" required />
          </label>
          <label class="form-field">
            <span>Telefone *</span>
            <input name="phone" type="tel" inputmode="numeric" autocomplete="tel" placeholder="(99) 99999-9999" value="${escapeHtml(payload?.phone || '')}" maxlength="15" required />
          </label>
          <label class="form-field">
            <span>Status</span>
            <select name="active">
              <option value="true" ${payload && payload.active ? 'selected' : ''}>Ativo</option>
              <option value="false" ${payload && !payload.active ? 'selected' : ''}>Inativo</option>
            </select>
          </label>
        </div>
        <p class="form-error" hidden></p>
        <div class="modal-actions">
          <button type="button" class="button secondary" data-close>Cancelar</button>
          <button type="submit" class="button primary">${mode === 'create' ? 'Cadastrar Cliente' : 'Salvar Alterações'}</button>
        </div>
      </form>
    `
    : `
      <form class="modal-form" id="vehicle-form">
        <div class="form-grid">
          <label class="form-field full-width">
            <span>Proprietário *</span>
            <select name="client_id" required>
              <option value="">Selecione um cliente</option>
              ${clients.map((client) => `<option value="${client.id}" ${payload && payload.client_id === client.id ? 'selected' : clientId === client.id ? 'selected' : ''}>${escapeHtml(client.name)}</option>`).join('')}
            </select>
          </label>
          <label class="form-field">
            <span>Marca *</span>
            <input name="brand" type="text" list="vehicle-brand-options" value="${escapeHtml(payload?.brand || '')}" required />
            <datalist id="vehicle-brand-options">${renderDatalistOptions(Object.keys(vehicleYearMinimums))}</datalist>
          </label>
          <label class="form-field">
            <span>Modelo *</span>
            <input name="model" type="text" list="vehicle-model-options" value="${escapeHtml(payload?.model || '')}" required />
            <datalist id="vehicle-model-options">${renderDatalistOptions(initialModelSuggestions)}</datalist>
          </label>
          <label class="form-field">
            <span>Ano *</span>
            <input name="year" type="number" list="vehicle-year-options" min="${initialYearMinimumValue}" max="${maximumYear}" placeholder="${initialYearMinimumValue} a ${maximumYear}" step="1" value="${payload?.year ?? ''}" required />
            <datalist id="vehicle-year-options">${renderDatalistOptions(initialYearSuggestions)}</datalist>
          </label>
          <label class="form-field">
            <span>Placa *</span>
            <input name="license_plate" type="text" placeholder="ABC1D23 ou ABC1234" value="${escapeHtml(payload?.license_plate || '')}" maxlength="7" autocomplete="off" required />
          </label>
          <label class="form-field">
            <span>Status</span>
            <select name="active">
              <option value="true" ${payload && payload.active ? 'selected' : ''}>Ativo</option>
              <option value="false" ${payload && !payload.active ? 'selected' : ''}>Inativo</option>
            </select>
          </label>
        </div>
        <p class="form-error" hidden></p>
        <div class="modal-actions">
          <button type="button" class="button secondary" data-close>Cancelar</button>
          <button type="submit" class="button primary">${mode === 'create' ? 'Cadastrar Veículo' : 'Salvar Alterações'}</button>
        </div>
      </form>
    `;

  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <div class="modal-shell">
      <div class="modal-header">
        <div>
          <span class="eyebrow">AutoService</span>
          <h2>${title}</h2>
        </div>
        <button type="button" class="icon-button" data-close aria-label="Fechar">${icon('close')}</button>
      </div>
      ${formMarkup}
    </div>
  `;
  document.body.appendChild(dialog);

  dialog.querySelectorAll('[data-close]').forEach((element) => {
    element.addEventListener('click', () => dialog.close());
  });

  dialog.addEventListener('close', () => dialog.remove());
  dialog.showModal();

  const form = dialog.querySelector('form');
  const errorBox = dialog.querySelector('.form-error');
  form.noValidate = true;

  if (isClient) {
    const phoneInput = form.querySelector('[name="phone"]');
    phoneInput.value = formatPhoneInput(phoneInput.value);
    phoneInput.addEventListener('input', () => {
      phoneInput.value = formatPhoneInput(phoneInput.value);
    });
  } else {
    const brandInput = form.querySelector('[name="brand"]');
    const modelInput = form.querySelector('[name="model"]');
    const modelOptions = form.querySelector('#vehicle-model-options');
    const yearInput = form.querySelector('[name="year"]');
    const yearOptions = form.querySelector('#vehicle-year-options');
    const plateInput = form.querySelector('[name="license_plate"]');
    const updateYearSuggestions = () => {
      const minimum = getVehicleYearMinimum(brandInput.value, modelInput.value);
      const minimumYear = minimum?.year || 1900;
      const currentMaximumYear = new Date().getFullYear() + 1;
      yearInput.min = String(minimumYear);
      yearInput.max = String(currentMaximumYear);
      yearInput.placeholder = `${minimumYear} a ${currentMaximumYear}`;
      yearOptions.innerHTML = renderDatalistOptions(getYearSuggestions(minimumYear, currentMaximumYear));

      if (yearInput.value) {
        const currentYear = Number(yearInput.value);
        if (!Number.isInteger(currentYear) || currentYear < minimumYear || currentYear > currentMaximumYear) {
          yearInput.value = '';
        }
      }
    };
    let previousBrand = normalize(brandInput.value);
    const updateModelOptions = () => {
      if (normalize(brandInput.value) !== previousBrand && modelInput.value && getVehicleModelMismatch(brandInput.value, modelInput.value)) {
        modelInput.value = '';
      }
      previousBrand = normalize(brandInput.value);
      modelOptions.innerHTML = renderDatalistOptions(getVehicleModels(brandInput.value));
      updateYearSuggestions();
    };

    brandInput.addEventListener('input', updateModelOptions);
    modelInput.addEventListener('input', updateYearSuggestions);
    updateYearSuggestions();
    plateInput.value = normalizeLicensePlate(plateInput.value);
    plateInput.addEventListener('input', () => {
      plateInput.value = normalizeLicensePlate(plateInput.value);
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;

    const showFormError = (message) => {
      errorBox.hidden = false;
      errorBox.textContent = message;
      submitButton.disabled = false;
    };

    const saveRecord = async (data) => {
      try {
        await apiRequest(`/api/${type}${recordId ? `/${recordId}` : ''}`, {
          method: mode === 'create' ? 'POST' : 'PUT',
          body: JSON.stringify(data),
        });
        await loadData();
        dialog.close();
        showToast(`${isClient ? 'Cliente' : 'Veículo'} ${mode === 'create' ? 'cadastrado' : 'atualizado'} com sucesso!`);
        render();
      } catch (error) {
        showFormError(error instanceof Error ? error.message : 'Não foi possível salvar o registro.');
      }
    };

    if (isClient) {
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim().toLowerCase();
      const phone = String(formData.get('phone') || '').trim();
      const active = String(formData.get('active') || 'true') === 'true';

      if (!isValidClientName(name)) {
        showFormError('Informe um nome válido.');
        return;
      }
      if (!email) {
        showFormError('E-mail é obrigatório.');
        return;
      }
      if (email.length > 150 || !/^[^\s@.][^\s@]*@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+$/i.test(email)) {
        showFormError('Informe um e-mail válido.');
        return;
      }
      const phoneError = getPhoneValidationMessage(phone);
      if (phoneError) {
        showFormError(phoneError);
        return;
      }

      await saveRecord({
        name,
        email,
        phone,
        active,
      });
    } else {
      const clientIdValue = String(formData.get('client_id') || '').trim();
      const brand = String(formData.get('brand') || '').trim();
      const model = String(formData.get('model') || '').trim();
      const plate = normalizeLicensePlate(formData.get('license_plate'));
      const yearValue = formData.get('year');
      const year = yearValue === null || yearValue === '' ? Number.NaN : Number(yearValue);
      const active = String(formData.get('active') || 'true') === 'true';
      const yearMinimum = getVehicleYearMinimum(brand, model);
      const minimumYear = yearMinimum?.year || 1900;

      if (!clientIdValue || !brand || !model || !plate) {
        showFormError('Preencha os campos obrigatórios do veículo.');
        return;
      }
      if (!hasLetters(brand) || brand.length > 80) {
        showFormError('Informe uma marca válida.');
        return;
      }
      if (!hasLettersOrNumbers(model) || model.length > 80) {
        showFormError('Informe um modelo válido.');
        return;
      }
      const modelMismatch = getVehicleModelMismatch(brand, model);
      if (modelMismatch) {
        showFormError(`O modelo ${modelMismatch.model} não pertence à marca ${modelMismatch.requestedBrand}.`);
        return;
      }
      if (!Number.isInteger(year) || year < minimumYear || year > new Date().getFullYear() + 1) {
        if (yearMinimum && Number.isInteger(year) && year < yearMinimum.year) {
          showFormError(`O ${yearMinimum.brand} ${yearMinimum.model} deve possuir ano igual ou posterior a ${yearMinimum.year}.`);
          return;
        }
        showFormError('Informe um ano inteiro entre 1900 e o próximo ano.');
        return;
      }
      if (!isValidLicensePlate(plate)) {
        showFormError('Informe uma placa brasileira válida.');
        return;
      }

      await saveRecord({
        client_id: clientIdValue,
        brand,
        model,
        year,
        license_plate: plate,
        active,
      });
    }
  });
}

function confirmDelete(type, recordId) {
  const isClient = type === 'clients';
  const record = isClient ? getClientById(recordId) : getVehicleById(recordId);
  if (!record) return;

  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <div class="modal-shell">
      <div class="modal-header">
        <div>
          <span class="eyebrow">AutoService</span>
          <h2>Excluir ${isClient ? 'Cliente' : 'Veículo'}</h2>
        </div>
        <button type="button" class="icon-button" data-close aria-label="Fechar">${icon('close')}</button>
      </div>
      <div class="delete-box">
        <div class="delete-icon">${icon('alert')}</div>
        <div class="delete-copy">
          <h3>Excluir ${isClient ? 'cliente' : 'veículo'}?</h3>
          <p>Tem certeza de que deseja excluir este ${isClient ? 'cliente' : 'veículo'}? Esta ação não poderá ser desfeita.</p>
        </div>
      </div>
      <div class="modal-actions" style="padding:0 20px 20px;">
        <button type="button" class="button secondary" data-close>Cancelar</button>
        <button type="button" class="button danger" id="confirm-delete">Excluir</button>
      </div>
    </div>
  `;

  document.body.appendChild(dialog);
  dialog.querySelectorAll('[data-close]').forEach((element) => element.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('close', () => dialog.remove());
  dialog.showModal();

  dialog.querySelector('#confirm-delete').addEventListener('click', async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      await apiRequest(`/api/${type}/${recordId}`, { method: 'DELETE' });
      await loadData();
      dialog.close();
      showToast(`${isClient ? 'Cliente' : 'Veículo'} excluído com sucesso!`);
      render();
    } catch (error) {
      dialog.close();
      showToast(error instanceof Error ? error.message : 'Não foi possível excluir o registro.', 'error');
    }
  });
}

function handleActionClick(event) {
  const target = event.target.closest('[data-action]');
  if (!target) return;

  const action = target.dataset.action;
  const entity = target.dataset.entity;
  const recordId = target.dataset.id || null;
  const clientId = target.dataset.clientId || null;

  if (action === 'create') {
    openModal(entity, 'create', null, clientId);
  }

  if (action === 'edit') {
    openModal(entity, 'edit', recordId, clientId);
  }

  if (action === 'delete') {
    confirmDelete(entity, recordId);
  }

  if (action === 'view') {
    if (entity === 'clients') {
      window.location.hash = `#/clients/${recordId}`;
    }
    if (entity === 'vehicles') {
      window.location.hash = `#/vehicles/${recordId}`;
    }
  }
}

function render() {
  const { route, detailId } = getRouteData();
  renderHeader(route);
  closeSidebar();

  if (route === 'dashboard') {
    renderDashboard();
    return;
  }

  if (route === 'clients' && detailId) {
    renderClientDetail(detailId);
    return;
  }

  if (route === 'vehicles' && detailId) {
    renderVehicleDetail(detailId);
    return;
  }

  if (route === 'clients') {
    buildListPage('clients');
    return;
  }

  if (route === 'vehicles') {
    buildListPage('vehicles');
    return;
  }

  document.getElementById('content').innerHTML = '<div class="empty-state"><h3>Página não encontrada.</h3><p>Use o menu para continuar.</p></div>';
}

async function refreshDashboard() {
  try {
    await loadData();
  } catch (error) {
    showToast(error instanceof Error ? error.message : 'Não foi possível atualizar o Dashboard.', 'error');
  }
  render();
}

document.addEventListener('click', (event) => {
  const nav = event.target.closest('.nav-item');
  if (nav) {
    const route = nav.dataset.route;
    if (route === 'dashboard') {
      if (getRouteData().route === 'dashboard') refreshDashboard();
      else window.location.hash = '#/dashboard';
    }
    if (route === 'clients') window.location.hash = '#/clients';
    if (route === 'vehicles') window.location.hash = '#/vehicles';
    return;
  }

  const closeButton = event.target.closest('.sidebar-overlay');
  if (closeButton) {
    closeSidebar();
    return;
  }

  const menuToggle = event.target.closest('.menu-toggle');
  if (menuToggle) {
    document.body.classList.toggle('menu-open');
    const expanded = document.body.classList.contains('menu-open');
    menuToggle.setAttribute('aria-expanded', String(expanded));
    return;
  }

  handleActionClick(event);
});

window.addEventListener('hashchange', () => {
  if (getRouteData().route === 'dashboard') refreshDashboard();
  else render();
});
window.addEventListener('load', async () => {
  try {
    const [catalog] = await Promise.all([
      apiRequest('/data/vehicleYearMinimums.json'),
      loadData(),
    ]);
    vehicleYearMinimums = catalog && typeof catalog === 'object' ? catalog : {};
  } catch (error) {
    showToast(error instanceof Error ? error.message : 'Não foi possível carregar os dados da API.', 'error');
  }
  render();
});
