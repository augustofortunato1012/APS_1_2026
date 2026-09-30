import type { Client } from '../models/Client.js';
import type { Vehicle } from '../models/Vehicle.js';

const baseDate = '2024-03-10T14:30:00.000Z';

export const mockClients: Client[] = [
  { id: '11111111-1111-4111-8111-111111111111', name: 'Carlos Silva', email: 'carlos@email.com', phone: '41999999999', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '22222222-2222-4222-8222-222222222222', name: 'Mariana Souza', email: 'mariana@email.com', phone: '41988888888', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '33333333-3333-4333-8333-333333333333', name: 'Rafael Oliveira', email: 'rafael@email.com', phone: '41977777777', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '44444444-4444-4444-8444-444444444444', name: 'Fernanda Lima', email: 'fernanda@email.com', phone: '41966666666', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '55555555-5555-4555-8555-555555555555', name: 'João Santos', email: 'joao@email.com', phone: '41955555555', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '66666666-6666-4666-8666-666666666666', name: 'Ana Costa', email: 'ana@email.com', phone: '41944444444', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '77777777-7777-4777-8777-777777777777', name: 'Pedro Almeida', email: 'pedro@email.com', phone: '41933333333', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '88888888-8888-4888-8888-888888888888', name: 'Juliana Martins', email: 'juliana@email.com', phone: '41922222222', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '99999999-9999-4999-8999-999999999999', name: 'Bruno Pereira', email: 'bruno@email.com', phone: '41911111111', active: false, created_at: baseDate, updated_at: baseDate },
  { id: 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', name: 'Larissa Costa', email: 'larissa@email.com', phone: '41910101010', active: false, created_at: baseDate, updated_at: baseDate },
  { id: 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb', name: 'Mateus Rocha', email: 'mateus@email.com', phone: '41909090909', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc', name: 'Sofia Mendes', email: 'sofia@email.com', phone: '41908080808', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'dddddddd-dddd-4ddd-8ddd-dddddddddddd', name: 'Renato Nunes', email: 'renato@email.com', phone: '41907070707', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee', name: 'Camila Dias', email: 'camila@email.com', phone: '41906060606', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'ffffffff-ffff-4fff-8fff-ffffffffffff', name: 'Leandro Melo', email: 'leandro@email.com', phone: '41905050505', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '12121212-1212-4121-8121-121212121212', name: 'Patricia Souza', email: 'patricia@email.com', phone: '41904040404', active: false, created_at: baseDate, updated_at: baseDate },
  { id: '13131313-1313-4131-8131-131313131313', name: 'Guilherme Azevedo', email: 'guilherme@email.com', phone: '41903030303', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '14141414-1414-4141-8141-141414141414', name: 'Viviane Rocha', email: 'viviane@email.com', phone: '41902020202', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '15151515-1515-4151-8151-151515151515', name: 'Thiago Barros', email: 'thiago@email.com', phone: '41901010101', active: true, created_at: baseDate, updated_at: baseDate },
  { id: '16161616-1616-4161-8161-161616161616', name: 'Isabela Moraes', email: 'isabela@email.com', phone: '41900000000', active: true, created_at: baseDate, updated_at: baseDate }
];

export const mockVehicles: Vehicle[] = [
  { id: 'a1111111-1111-4111-8111-111111111111', client_id: mockClients[0].id, brand: 'Volkswagen', model: 'Golf', year: 2020, license_plate: 'ABC1D23', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'a2222222-2222-4222-8222-222222222222', client_id: mockClients[0].id, brand: 'Honda', model: 'Civic', year: 2021, license_plate: 'DEF4G56', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'a3333333-3333-4333-8333-333333333333', client_id: mockClients[1].id, brand: 'Toyota', model: 'Corolla', year: 2019, license_plate: 'GHI7J89', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'a4444444-4444-4444-8444-444444444444', client_id: mockClients[3].id, brand: 'Hyundai', model: 'HB20', year: 2022, license_plate: 'JKL0M12', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'a5555555-5555-4555-8555-555555555555', client_id: mockClients[4].id, brand: 'Chevrolet', model: 'Onix', year: 2021, license_plate: 'MNO3P45', active: false, created_at: baseDate, updated_at: baseDate },
  { id: 'a6666666-6666-4666-8666-666666666666', client_id: mockClients[2].id, brand: 'Jeep', model: 'Compass', year: 2020, license_plate: 'QRS6T78', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'a7777777-7777-4777-8777-777777777777', client_id: mockClients[5].id, brand: 'Nissan', model: 'Kicks', year: 2023, license_plate: 'UVW8X12', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'a8888888-8888-4888-8888-888888888888', client_id: mockClients[6].id, brand: 'Volkswagen', model: 'T-Cross', year: 2022, license_plate: 'YZA4B56', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'a9999999-9999-4999-8999-999999999999', client_id: mockClients[7].id, brand: 'Ford', model: 'Ka', year: 2021, license_plate: 'BCD5E67', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'b1111111-1111-4111-8111-111111111111', client_id: mockClients[8].id, brand: 'Fiat', model: 'Uno', year: 2018, license_plate: 'EFG7H89', active: false, created_at: baseDate, updated_at: baseDate },
  { id: 'b2222222-2222-4222-8222-222222222222', client_id: mockClients[9].id, brand: 'Peugeot', model: '208', year: 2020, license_plate: 'HIJ9K01', active: false, created_at: baseDate, updated_at: baseDate },
  { id: 'b3333333-3333-4333-8333-333333333333', client_id: mockClients[10].id, brand: 'Renault', model: 'Logan', year: 2019, license_plate: 'KLM2N34', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'b4444444-4444-4444-8444-444444444444', client_id: mockClients[11].id, brand: 'BMW', model: '320i', year: 2022, license_plate: 'NOP4Q56', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'b5555555-5555-4555-8555-555555555555', client_id: mockClients[12].id, brand: 'Audi', model: 'A3', year: 2021, license_plate: 'QRS7T89', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'b6666666-6666-4666-8666-666666666666', client_id: mockClients[13].id, brand: 'Citroën', model: 'C3', year: 2023, license_plate: 'TUV8W10', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'b7777777-7777-4777-8777-777777777777', client_id: mockClients[14].id, brand: 'Mercedes', model: 'A 200', year: 2020, license_plate: 'XYZ0A12', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'b8888888-8888-4888-8888-888888888888', client_id: mockClients[15].id, brand: 'Toyota', model: 'Etios', year: 2017, license_plate: 'BCD2E34', active: false, created_at: baseDate, updated_at: baseDate },
  { id: 'b9999999-9999-4999-8999-999999999999', client_id: mockClients[16].id, brand: 'Volvo', model: 'V40', year: 2019, license_plate: 'FGH4I56', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'c1111111-1111-4111-8111-111111111111', client_id: mockClients[17].id, brand: 'Honda', model: 'Fit', year: 2021, license_plate: 'IJK6L78', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'c2222222-2222-4222-8222-222222222222', client_id: mockClients[18].id, brand: 'Chevrolet', model: 'Cruze', year: 2018, license_plate: 'LMN8O90', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'c3333333-3333-4333-8333-333333333333', client_id: mockClients[19].id, brand: 'Mitsubishi', model: 'Outlander', year: 2022, license_plate: 'OPQ1R23', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'c4444444-4444-4444-8444-444444444444', client_id: mockClients[0].id, brand: 'Mazda', model: '3', year: 2021, license_plate: 'DEF2G34', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'c5555555-5555-4555-8555-555555555555', client_id: mockClients[1].id, brand: 'Fiat', model: 'Pulse', year: 2023, license_plate: 'GHI4J56', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'c6666666-6666-4666-8666-666666666666', client_id: mockClients[2].id, brand: 'BMW', model: 'X1', year: 2024, license_plate: 'JKL6M78', active: true, created_at: baseDate, updated_at: baseDate },
  { id: 'c7777777-7777-4777-8777-777777777777', client_id: mockClients[3].id, brand: 'Porsche', model: 'Macan', year: 2023, license_plate: 'MNO8P90', active: true, created_at: baseDate, updated_at: baseDate }
];
