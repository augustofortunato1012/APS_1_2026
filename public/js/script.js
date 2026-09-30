const clients = [
  { id: '11111111-1111-4111-8111-111111111111', name: 'Carlos Silva', email: 'carlos@email.com', phone: '41999999999', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '22222222-2222-4222-8222-222222222222', name: 'Mariana Souza', email: 'mariana@email.com', phone: '41988888888', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '33333333-3333-4333-8333-333333333333', name: 'Rafael Oliveira', email: 'rafael@email.com', phone: '41977777777', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '44444444-4444-4444-8444-444444444444', name: 'Fernanda Lima', email: 'fernanda@email.com', phone: '41966666666', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '55555555-5555-4555-8555-555555555555', name: 'João Santos', email: 'joao@email.com', phone: '41955555555', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '66666666-6666-4666-8666-666666666666', name: 'Ana Costa', email: 'ana@email.com', phone: '41944444444', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '77777777-7777-4777-8777-777777777777', name: 'Pedro Almeida', email: 'pedro@email.com', phone: '41933333333', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '88888888-8888-4888-8888-888888888888', name: 'Juliana Martins', email: 'juliana@email.com', phone: '41922222222', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '99999999-9999-4999-8999-999999999999', name: 'Bruno Pereira', email: 'bruno@email.com', phone: '41911111111', active: false, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', name: 'Larissa Costa', email: 'larissa@email.com', phone: '41910101010', active: false, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', name: 'Mateus Rocha', email: 'mateus@email.com', phone: '41909090909', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', name: 'Sofia Mendes', email: 'sofia@email.com', phone: '41908080808', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', name: 'Renato Nunes', email: 'renato@email.com', phone: '41907070707', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', name: 'Camila Dias', email: 'camila@email.com', phone: '41906060606', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'ffffffff-ffff-4fff-8fff-ffffffffffff', name: 'Leandro Melo', email: 'leandro@email.com', phone: '41905050505', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '12121212-1212-4121-8121-121212121212', name: 'Patricia Souza', email: 'patricia@email.com', phone: '41904040404', active: false, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '13131313-1313-4131-8131-131313131313', name: 'Guilherme Azevedo', email: 'guilherme@email.com', phone: '41903030303', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '14141414-1414-4141-8141-141414141414', name: 'Viviane Rocha', email: 'viviane@email.com', phone: '41902020202', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '15151515-1515-4151-8151-151515151515', name: 'Thiago Barros', email: 'thiago@email.com', phone: '41901010101', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: '16161616-1616-4161-8161-161616161616', name: 'Isabela Moraes', email: 'isabela@email.com', phone: '41900000000', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' }
];

const vehicles = [
  { id: 'a1111111-1111-4111-8111-111111111111', client_id: clients[0].id, brand: 'Volkswagen', model: 'Golf', year: 2020, license_plate: 'ABC1D23', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'a2222222-2222-4222-8222-222222222222', client_id: clients[0].id, brand: 'Honda', model: 'Civic', year: 2021, license_plate: 'DEF4G56', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'a3333333-3333-4333-8333-333333333333', client_id: clients[1].id, brand: 'Toyota', model: 'Corolla', year: 2019, license_plate: 'GHI7J89', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'a4444444-4444-4444-8444-444444444444', client_id: clients[3].id, brand: 'Hyundai', model: 'HB20', year: 2022, license_plate: 'JKL0M12', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'a5555555-5555-4555-8555-555555555555', client_id: clients[4].id, brand: 'Chevrolet', model: 'Onix', year: 2021, license_plate: 'MNO3P45', active: false, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'a6666666-6666-4666-8666-666666666666', client_id: clients[2].id, brand: 'Jeep', model: 'Compass', year: 2020, license_plate: 'QRS6T78', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'a7777777-7777-4777-8777-777777777777', client_id: clients[5].id, brand: 'Nissan', model: 'Kicks', year: 2023, license_plate: 'UVW8X12', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'a8888888-8888-4888-8888-888888888888', client_id: clients[6].id, brand: 'Volkswagen', model: 'T-Cross', year: 2022, license_plate: 'YZA4B56', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'a9999999-9999-4999-8999-999999999999', client_id: clients[7].id, brand: 'Ford', model: 'Ka', year: 2021, license_plate: 'BCD5E67', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b1111111-1111-4111-8111-111111111111', client_id: clients[8].id, brand: 'Fiat', model: 'Uno', year: 2018, license_plate: 'EFG7H89', active: false, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b2222222-2222-4222-8222-222222222222', client_id: clients[9].id, brand: 'Peugeot', model: '208', year: 2020, license_plate: 'HIJ9K01', active: false, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b3333333-3333-4333-8333-333333333333', client_id: clients[10].id, brand: 'Renault', model: 'Logan', year: 2019, license_plate: 'KLM2N34', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b4444444-4444-4444-8444-444444444444', client_id: clients[11].id, brand: 'BMW', model: '320i', year: 2022, license_plate: 'NOP4Q56', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b5555555-5555-4555-8555-555555555555', client_id: clients[12].id, brand: 'Audi', model: 'A3', year: 2021, license_plate: 'QRS7T89', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b6666666-6666-4666-8666-666666666666', client_id: clients[13].id, brand: 'Citroën', model: 'C3', year: 2023, license_plate: 'TUV8W10', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b7777777-7777-4777-8777-777777777777', client_id: clients[14].id, brand: 'Mercedes', model: 'A 200', year: 2020, license_plate: 'XYZ0A12', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b8888888-8888-4888-8888-888888888888', client_id: clients[15].id, brand: 'Toyota', model: 'Etios', year: 2017, license_plate: 'BCD2E34', active: false, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'b9999999-9999-4999-8999-999999999999', client_id: clients[16].id, brand: 'Volvo', model: 'V40', year: 2019, license_plate: 'FGH4I56', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'c1111111-1111-4111-8111-111111111111', client_id: clients[17].id, brand: 'Honda', model: 'Fit', year: 2021, license_plate: 'IJK6L78', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'c2222222-2222-4222-8222-222222222222', client_id: clients[18].id, brand: 'Chevrolet', model: 'Cruze', year: 2018, license_plate: 'LMN8O90', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'c3333333-3333-4333-8333-333333333333', client_id: clients[19].id, brand: 'Mitsubishi', model: 'Outlander', year: 2022, license_plate: 'OPQ1R23', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'c4444444-4444-4444-8444-444444444444', client_id: clients[0].id, brand: 'Mazda', model: '3', year: 2021, license_plate: 'DEF2G34', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'c5555555-5555-4555-8555-555555555555', client_id: clients[1].id, brand: 'Fiat', model: 'Pulse', year: 2023, license_plate: 'GHI4J56', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'c6666666-6666-4666-8666-666666666666', client_id: clients[2].id, brand: 'BMW', model: 'X1', year: 2024, license_plate: 'JKL6M78', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' },
  { id: 'c7777777-7777-4777-8777-777777777777', client_id: clients[3].id, brand: 'Porsche', model: 'Macan', year: 2023, license_plate: 'MNO8P90', active: true, created_at: '2024-03-10T14:30:00.000Z', updated_at: '2024-03-10T14:30:00.000Z' }
];

const state = {
  route: 'dashboard',
  filter: '',
  currentPage: 1,
  pageSize: 8,
};

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
  const activeClients = clients.filter((client) => client.active).length;
  const activeVehicles = vehicles.filter((vehicle) => vehicle.active).length;
  const recentClients = clients.slice(0, 4);
  const recentVehicles = vehicles.slice(0, 4);

  const markup = `
    <section class="stats-grid">
      <article class="stat-card">
        <div class="card-head"><span>Clientes</span><span class="card-icon">${icon('users')}</span></div>
        <strong>${clients.length}</strong>
        <small>+12% este mês</small>
      </article>
      <article class="stat-card">
        <div class="card-head"><span>Veículos</span><span class="card-icon">${icon('car')}</span></div>
        <strong>${vehicles.length}</strong>
        <small>+8% este mês</small>
      </article>
      <article class="stat-card success">
        <div class="card-head"><span>Clientes Ativos</span><span class="card-icon">${icon('users')}</span></div>
        <strong>${activeClients}</strong>
        <small>${Math.round((activeClients / clients.length) * 100)}% do total</small>
      </article>
      <article class="stat-card success">
        <div class="card-head"><span>Veículos Ativos</span><span class="card-icon">${icon('car')}</span></div>
        <strong>${activeVehicles}</strong>
        <small>${Math.round((activeVehicles / vehicles.length) * 100)}% do total</small>
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
          ${['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map((day, index) => `
            <div class="chart-day">
              <div class="bars">
                <span class="bar blue" style="height:${[48, 62, 70, 56, 82, 66, 78][index]}%"></span>
                <span class="bar dark" style="height:${[40, 54, 58, 48, 64, 52, 60][index]}%"></span>
              </div>
              <label>${day}</label>
            </div>
          `).join('')}
        </div>
      </article>

      <article class="panel donut-panel">
        <div class="panel-header">
          <h3>Status dos veículos</h3>
        </div>
        <div class="donut-wrap">
          <div class="donut-chart">
            <div class="donut-inner">
              <strong>${vehicles.length}</strong>
              <span>Veículos</span>
            </div>
          </div>
        </div>
        <ul class="status-list">
          <li><span><span class="dot success"></span>Ativos</span><strong>${activeVehicles}</strong></li>
          <li><span><span class="dot danger"></span>Inativos</span><strong>${vehicles.length - activeVehicles}</strong></li>
        </ul>
      </article>
    </section>

    <section class="content-grid">
      <article class="panel list-panel">
        <div class="panel-header">
          <h3>Clientes recentes</h3>
          <a class="text-link" href="#/clients">Ver todos ${icon('arrowRight')}</a>
        </div>
        <div class="mini-list">
          ${recentClients.map((client) => {
            const initials = client.name.split(' ').map((part) => part[0]).slice(0,2).join('').toUpperCase();
            return `
              <div class="mini-list-item">
                <div class="avatar">${initials}</div>
                <div class="mini-text">
                  <strong>${escapeHtml(client.name)}</strong>
                  <a href="mailto:${escapeHtml(client.email)}">${escapeHtml(client.email)}</a>
                  <span>há 934 dias</span>
                </div>
              </div>
          `;
          }).join('')}
        </div>
      </article>

      <article class="panel list-panel">
        <div class="panel-header">
          <h3>Veículos recentes</h3>
          <a class="text-link" href="#/vehicles">Ver todos ${icon('arrowRight')}</a>
        </div>
        <div class="mini-list">
          ${recentVehicles.map((vehicle) => `
            <div class="mini-list-item">
              <div class="mini-car">${icon('car')}</div>
              <div class="mini-text">
                <strong>${escapeHtml(vehicle.model)}</strong>
                <span>${escapeHtml(vehicle.license_plate)}</span>
                <small>há 934 dias</small>
              </div>
            </div>
          `).join('')}
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
            ${tableRows || '<tr><td colspan="7"><div class="empty-state"><h3>Nenhum registro encontrado.</h3><p>Atualize a busca para continuar.</p></div></td></tr>'}
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
          ? `<div class="table-wrap"><table><thead><tr><th>Veículo</th><th>Marca</th><th>Placa</th><th>Status</th><th class="actions-col">Ações</th></tr></thead><tbody>${vehicleList.map((vehicle) => `
              <tr>
                <td><strong>${escapeHtml(vehicle.model)}</strong></td>
                <td>${escapeHtml(vehicle.brand)}</td>
                <td><span class="plate-tag">${escapeHtml(vehicle.license_plate)}</span></td>
                <td><span class="badge ${getBadgeClass(vehicle.active)}"><span class="dot ${vehicle.active ? 'success' : 'danger'}"></span>${getStatusLabel(vehicle.active)}</span></td>
                <td><div class="table-actions"><button type="button" class="row-action" data-action="view" data-entity="vehicles" data-id="${vehicle.id}">${icon('view')}</button><button type="button" class="row-action" data-action="edit" data-entity="vehicles" data-id="${vehicle.id}">${icon('edit')}</button><button type="button" class="row-action danger" data-action="delete" data-entity="vehicles" data-id="${vehicle.id}">${icon('trash')}</button></div></td>
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
            <span>Telefone</span>
            <input name="phone" type="tel" value="${escapeHtml(payload?.phone || '')}" maxlength="20" />
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
            <input name="brand" type="text" value="${escapeHtml(payload?.brand || '')}" required />
          </label>
          <label class="form-field">
            <span>Modelo *</span>
            <input name="model" type="text" value="${escapeHtml(payload?.model || '')}" required />
          </label>
          <label class="form-field">
            <span>Ano</span>
            <input name="year" type="number" min="1886" max="2100" value="${payload?.year ?? ''}" />
          </label>
          <label class="form-field">
            <span>Placa *</span>
            <input name="license_plate" type="text" value="${escapeHtml(payload?.license_plate || '')}" required />
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

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    if (isClient) {
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const phone = String(formData.get('phone') || '').trim();
      const active = String(formData.get('active') || 'true') === 'true';

      if (!name) {
        errorBox.hidden = false;
        errorBox.textContent = 'Nome é obrigatório.';
        return;
      }
      if (!email) {
        errorBox.hidden = false;
        errorBox.textContent = 'E-mail é obrigatório.';
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorBox.hidden = false;
        errorBox.textContent = 'Informe um e-mail válido.';
        return;
      }

      const payloadData = {
        id: recordId || crypto.randomUUID(),
        name,
        email,
        phone: phone.replace(/\D/g, ''),
        active,
        created_at: payload?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (mode === 'create') {
        clients.unshift(payloadData);
        showToast('Cliente cadastrado com sucesso!', 'success');
      } else {
        const index = clients.findIndex((client) => client.id === recordId);
        if (index >= 0) clients[index] = { ...clients[index], ...payloadData, id: recordId };
        showToast('Cliente atualizado com sucesso!', 'success');
      }
    } else {
      const clientIdValue = String(formData.get('client_id') || '').trim();
      const brand = String(formData.get('brand') || '').trim();
      const model = String(formData.get('model') || '').trim();
      const plate = String(formData.get('license_plate') || '').trim().toUpperCase();
      const yearValue = formData.get('year');
      const year = yearValue === null || yearValue === '' ? null : Number(yearValue);
      const active = String(formData.get('active') || 'true') === 'true';

      if (!clientIdValue || !brand || !model || !plate) {
        errorBox.hidden = false;
        errorBox.textContent = 'Preencha os campos obrigatórios do veículo.';
        return;
      }

      const payloadData = {
        id: recordId || crypto.randomUUID(),
        client_id: clientIdValue,
        brand,
        model,
        year,
        license_plate: plate,
        active,
        created_at: payload?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      if (mode === 'create') {
        vehicles.unshift(payloadData);
        showToast('Veículo cadastrado com sucesso!', 'success');
      } else {
        const index = vehicles.findIndex((vehicle) => vehicle.id === recordId);
        if (index >= 0) vehicles[index] = { ...vehicles[index], ...payloadData, id: recordId };
        showToast('Veículo atualizado com sucesso!', 'success');
      }
    }

    dialog.close();
    render();
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

  dialog.querySelector('#confirm-delete').addEventListener('click', () => {
    if (isClient) {
      const hasLinkedVehicles = vehicles.some((vehicle) => vehicle.client_id === recordId);
      if (hasLinkedVehicles) {
        showToast('Este cliente possui veículos vinculados. Remova os veículos antes de excluir.', 'error');
        dialog.close();
        return;
      }
      const index = clients.findIndex((client) => client.id === recordId);
      if (index >= 0) clients.splice(index, 1);
      showToast('Cliente excluído com sucesso!', 'success');
    } else {
      const index = vehicles.findIndex((vehicle) => vehicle.id === recordId);
      if (index >= 0) vehicles.splice(index, 1);
      showToast('Veículo excluído com sucesso!', 'success');
    }

    dialog.close();
    render();
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
  state.route = route;
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

document.addEventListener('click', (event) => {
  const nav = event.target.closest('.nav-item');
  if (nav) {
    const route = nav.dataset.route;
    if (route === 'dashboard') window.location.hash = '#/dashboard';
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

window.addEventListener('hashchange', render);
window.addEventListener('load', render);
