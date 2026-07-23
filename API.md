# SAverse API

Базовый префикс: `/api`

Все ответы имеют единый конверт (`internal/controller/dto/response.go`):

```json
{
  "code": 200,
  "message": "human readable message",
  "data": { }
}
```

`data` присутствует только когда есть что возвращать (`omitempty`).

Защищённые роуты требуют заголовок:
```
Authorization: Bearer <accessToken>
```
Обрабатывается `middleware.Auth` (`internal/middleware/auth.go`) — при отсутствии/невалидном токене возвращает `401` и не пускает дальше. При успехе кладёт в контекст `userId` (int) и `email`.

---

## Auth — `/api/auth` (без токена)

### POST `/api/auth/register`
Регистрация нового пользователя.

Request body:
```json
{
  "email": "string, required, email",
  "password": "string, required, min 8 символов"
}
```

Response `200`:
```json
{ "code": 200, "message": "registration success", "data": { "accessToken": "string", "refreshToken": "string" } }
```

Ошибки:
- `400` invalid json
- `400` user already exists
- `500` registration failed

### POST `/api/auth/login`
Request body:
```json
{
  "email": "string, required, email",
  "password": "string, required"
}
```

Response `200`: тот же `TokensResponse` (`accessToken`, `refreshToken`), message `"login success"`.

Ошибки:
- `400` invalid json
- `401` invalid credentials
- `500` login failed

### POST `/api/auth/refresh`
Request body:
```json
{ "refreshToken": "string, required" }
```

Response `200`: `TokensResponse`, message `"refresh success"`.

Ошибки:
- `400` invalid json
- `401` invalid token
- `500` refresh failed

---

## Auth — `/api/auth` (требует токен)

### GET `/api/auth/me`
Без тела запроса. `userId` берётся из токена.

Response `200`:
```json
{ "code": 200, "message": "user fetched succesfully", "data": { "email": "string" } }
```

Ошибки:
- `404` user not found
- `500` error getting profile

---

## Galaxies — `/api/galaxies` (требует токен)

Все запросы работают только с галактиками владельца (`userId` из токена).

### GET `/api/galaxies`
Список галактик пользователя.

Response `200`:
```json
{
  "code": 200,
  "message": "galaxies fetched successfuly",
  "data": [
    { "id": 1, "name": "string", "color": "string", "view": "string|null" }
  ]
}
```

### GET `/api/galaxies/:id`
Одна галактика вместе с её планетами.

Response `200`:
```json
{
  "code": 200,
  "message": "galaxy fetched successfully",
  "data": {
    "id": 1, "name": "string", "color": "string", "view": "string|null",
    "planets": [
      { "id": 1, "name": "string", "color": "string", "note": "string", "view": "string|null", "id_galaxy": 1 }
    ]
  }
}
```

Ошибки:
- `400` invalid id
- `404` galaxy not found
- `500` failed to fetch galaxy / failed to fetch planets

### POST `/api/galaxies`
Request body:
```json
{
  "name": "string, required",
  "color": "string, required",
  "view": "string|null, optional"
}
```

Response `200`: созданная галактика (`Galaxy` DTO, как выше без `planets`), message `"galaxy created successfully"`.

Ошибки:
- `400` invalid json
- `500` failed to create galaxy

### PUT `/api/galaxies/:id`
Request body (все поля опциональны — частичное обновление):
```json
{
  "name": "string|null",
  "color": "string|null",
  "view": "string|null"
}
```

Response `200`: обновлённая галактика (`Galaxy` DTO), message `"galaxy updated"`.

Ошибки:
- `400` invalid id / invalid json
- `404` galaxy not found
- `500` failed to update galaxy

### DELETE `/api/galaxies/:id`
Без тела.

Response `200`: message `"galaxy deleted successfuly"`, без `data`.

Ошибки:
- `400` invalid id
- `404` galaxy not found
- `500` failed to update galaxy *(сообщение об ошибке в коде такое же, как при update — вероятно баг копипаста)*

---

## Planets — `/api/planets` (требует токен)

Примечание: в отличие от galaxies, здесь нет `GET /api/planets` (списка всех планет пользователя) — только по id или через `GET /api/galaxies/:id`.

### GET `/api/planets/:id`
Планета вместе с её галактикой.

Response `200`:
```json
{
  "code": 200,
  "message": "planet fetched successfuly",
  "data": {
    "planet": { "id": 1, "name": "string", "color": "string", "note": "string", "view": "string|null", "id_galaxy": 1 },
    "galaxy": { "id": 1, "name": "string", "color": "string", "view": "string|null" }
  }
}
```

Ошибки:
- `400` error getting planet (невалидный id)
- `404` planet not found
- `500` error getting planet / failed to fetch planet

### POST `/api/planets`
Request body:
```json
{
  "name": "string",
  "color": "string",
  "view": "string|null",
  "id_galaxy": 1
}
```
*(в DTO нет `binding` тегов на этих полях, т.е. валидация required не проставлена)*

Response `200`: созданная планета (`Planet` DTO), message `"planet created successfuly"`.

Ошибки:
- `400` error creating planet (невалидный json)
- `500` failed to create planet

### PUT `/api/planets/:id`
Request body (частичное обновление):
```json
{
  "name": "string|null",
  "color": "string|null",
  "note": "string|null",
  "view": "string|null"
}
```

Response `200`: обновлённая планета (`Planet` DTO), message `"planet updated successfuly"`.

Ошибки:
- `400` error getting planet (невалидный id) / error updating planet (невалидный json)
- `404` planet not found
- `500` failed to update planet

### DELETE `/api/planets/:id`
Без тела.

Response `200`: message `"planet deleted successfuly"`, без `data`.

Ошибки:
- `400` error getting planet (невалидный id)
- `404` planet not found
- `500` failed to delete planet

---

## Сводная таблица

| Метод | Путь | Auth | Тело запроса | Данные в ответе |
|---|---|---|---|---|
| POST | /api/auth/register | нет | email, password | accessToken, refreshToken |
| POST | /api/auth/login | нет | email, password | accessToken, refreshToken |
| POST | /api/auth/refresh | нет | refreshToken | accessToken, refreshToken |
| GET | /api/auth/me | да | — | email |
| GET | /api/galaxies | да | — | Galaxy[] |
| GET | /api/galaxies/:id | да | — | Galaxy + planets[] |
| POST | /api/galaxies | да | name, color, view? | Galaxy |
| PUT | /api/galaxies/:id | да | name?, color?, view? | Galaxy |
| DELETE | /api/galaxies/:id | да | — | — |
| GET | /api/planets/:id | да | — | Planet + Galaxy |
| POST | /api/planets | да | name, color, view?, id_galaxy | Planet |
| PUT | /api/planets/:id | да | name?, color?, note?, view? | Planet |
| DELETE | /api/planets/:id | да | — | — |
