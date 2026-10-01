# Roteiro de testes da API no Thunder Client

Inicie o projeto com `npm run dev` e use a base `http://localhost:3000`. Para os testes de sucesso, escolha um e-mail e uma placa ainda não cadastrados. Nos testes seguintes, reutilize os valores criados. Copie os UUIDs retornados pelo Supabase e substitua os marcadores nas URLs e bodies.

## Saúde e clientes

### 1. Verificar API
- Método: `GET`
- URL: `http://localhost:3000/health`
- Status esperado: `200 OK`
- Resultado: JSON com `status: "ok"`.

### 2. Criar cliente
- Método: `POST`
- URL: `http://localhost:3000/api/clients`
- Body (JSON):
```json
{
  "name": "João da Silva",
  "email": "joao.teste.unico@example.com",
  "phone": "(41) 99999-9999",
  "active": true
}
```
- Status esperado: `201 Created`
- Resultado: cliente gravado no Supabase; guarde o `id` retornado como `SUBSTITUA_PELO_UUID_DO_CLIENTE`.

### 3. Listar clientes
- Método: `GET`
- URL: `http://localhost:3000/api/clients`
- Status esperado: `200 OK`
- Resultado: lista contendo o cliente recém-criado.

### 4. Buscar cliente
- Método: `GET`
- URL: `http://localhost:3000/api/clients/SUBSTITUA_PELO_UUID_DO_CLIENTE`
- Status esperado: `200 OK`
- Resultado: dados do João.

### 5. Atualizar cliente
- Método: `PUT`
- URL: `http://localhost:3000/api/clients/SUBSTITUA_PELO_UUID_DO_CLIENTE`
- Body (JSON):
```json
{
  "name": "João da Silva Atualizado",
  "email": "joao.teste.unico@example.com",
  "phone": "(41) 98888-7777",
  "active": true
}
```
- Status esperado: `200 OK`
- Resultado: cliente atualizado, com `updated_at` atualizado.

## Veículos e relacionamento

### 6. Criar veículo
- Método: `POST`
- URL: `http://localhost:3000/api/vehicles`
- Body (JSON):
```json
{
  "client_id": "SUBSTITUA_PELO_UUID_DO_CLIENTE",
  "brand": "Honda",
  "model": "Civic",
  "year": 2022,
  "license_plate": "ABC1D23",
  "active": true
}
```
- Status esperado: `201 Created`
- Resultado: veículo gravado e relacionado ao cliente; guarde o `id` retornado como `SUBSTITUA_PELO_UUID_DO_VEICULO`.

### 7. Listar veículos
- Método: `GET`
- URL: `http://localhost:3000/api/vehicles`
- Status esperado: `200 OK`
- Resultado: lista contendo o Civic.

### 8. Buscar veículo
- Método: `GET`
- URL: `http://localhost:3000/api/vehicles/SUBSTITUA_PELO_UUID_DO_VEICULO`
- Status esperado: `200 OK`
- Resultado: dados do veículo e seu `client_id`.

### 9. Atualizar veículo
- Método: `PUT`
- URL: `http://localhost:3000/api/vehicles/SUBSTITUA_PELO_UUID_DO_VEICULO`
- Body (JSON):
```json
{
  "client_id": "SUBSTITUA_PELO_UUID_DO_CLIENTE",
  "brand": "Honda",
  "model": "Civic Touring",
  "year": 2022,
  "license_plate": "ABC1D23",
  "active": true
}
```
- Status esperado: `200 OK`
- Resultado: modelo atualizado.

### 10. Listar veículos do cliente
- Método: `GET`
- URL: `http://localhost:3000/api/clients/SUBSTITUA_PELO_UUID_DO_CLIENTE/vehicles`
- Status esperado: `200 OK`
- Resultado: lista contendo o Honda Civic, demonstrando a relação Client 1:N Vehicle.

## Validações e erros

### 11. E-mail duplicado
- Método: `POST`
- URL: `http://localhost:3000/api/clients`
- Body: repita o body do teste 2 com o mesmo e-mail.
- Status esperado: `409 Conflict`
- Resultado: mensagem `E-mail já cadastrado.`.

### 12. Placa duplicada
- Método: `POST`
- URL: `http://localhost:3000/api/vehicles`
- Body: repita o body do teste 6 com `license_plate: "ABC1D23"`.
- Status esperado: `409 Conflict`
- Resultado: mensagem `Placa já cadastrada.`.

### 13. Campo obrigatório de cliente ausente
- Método: `POST`
- URL: `http://localhost:3000/api/clients`
- Body (JSON): `{ "email": "outro@example.com", "phone": "41999999999" }` (sem `name`) ou repita o teste com `phone` vazio.
- Status esperado: `400 Bad Request`
- Resultado: mensagem indicando o campo obrigatório.

### 14. Campo obrigatório de veículo ausente
- Método: `POST`
- URL: `http://localhost:3000/api/vehicles`
- Body: use o body do teste 6 sem `brand`.
- Status esperado: `400 Bad Request`
- Resultado: mensagem indicando que a marca é obrigatória.

### 15. Cliente informado não existe
- Método: `POST`
- URL: `http://localhost:3000/api/vehicles`
- Body: use o body do teste 6 com `client_id: "00000000-0000-4000-8000-000000000000"` e uma placa ainda não cadastrada.
- Status esperado: `400 Bad Request`
- Resultado: mensagem `Cliente informado não existe.`. A Foreign Key permanece ativa no PostgreSQL.

### 16. Recurso inexistente
- Método: `GET`
- URL: `http://localhost:3000/api/clients/00000000-0000-4000-8000-000000000000` e `http://localhost:3000/api/vehicles/00000000-0000-4000-8000-000000000000`
- Status esperado: `404 Not Found`
- Resultado: mensagem de recurso não encontrado.

## Exclusões (por último)

### 17. Excluir veículo diretamente
- Primeiro crie um segundo veículo para o cliente, com placa ainda não usada, e guarde seu UUID.
- Método: `DELETE`
- URL: `http://localhost:3000/api/vehicles/SUBSTITUA_PELO_UUID_DO_VEICULO`
- Status esperado: `204 No Content`
- Resultado: sem body; um `GET` pelo UUID excluído retorna `404 Not Found`.

### 18. Excluir cliente e verificar cascade
- Faça este teste por último. Use o UUID do cliente que ainda possui o veículo do teste 6.
- Método: `DELETE`
- URL: `http://localhost:3000/api/clients/SUBSTITUA_PELO_UUID_DO_CLIENTE`
- Status esperado: `204 No Content`
- Resultado: o cliente e os veículos associados são removidos pela regra `ON DELETE CASCADE`.

### 19. Confirmar veículo removido pelo cascade
- Método: `GET`
- URL: `http://localhost:3000/api/vehicles/SUBSTITUA_PELO_UUID_DO_VEICULO`
- Status esperado: `404 Not Found`
- Resultado: comprova a exclusão em cascata da Foreign Key.
