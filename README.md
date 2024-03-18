# distance-calculator

Uma API que calcula a distância entre duas ou mais localizações.

### Ferramentas utilizadas

- NodeJS
- ExpressJS
- Typescript
- Jest
- prettier
- faker

### Rodando localmente

1. Clone o repositório

```sh
git clone https://github.com/Deltinha/distance-calculator
```

2. Navegue até a pasta e instale as dependências

```sh
cd distance-calculator && npm install
```

3. (OPCIONAL) Seguindo o arquivo .env-example como exemplo, crie um arquivo .env e configure a varívavel de ambiente PORT. Caso pule esse passo, a porta 4000 será usada por padrão.

```ssh
touch .env && echo 'PORT=4000' >> .env
```

4. Inicie a aplicação em modo desenvolvimento

```sh
npm run dev
```

#### Importante

Para usar a aplicação, é necessário ter uma API key da Google Maps Platform e um projeto na Google Cloud com Geocoding API habilitado.
Saiba como obter uma key acessando [https://developers.google.com/maps/documentation/geocoding/get-api-key](https://developers.google.com/maps/documentation/geocoding/get-api-key)

### Documentação

**GET** `/distance?key=YOUR_API_KEY`

Retorna a distância dois a dois, entre todas as localizações. Também informa as localizações mais distantes e mais próximas.
Essa rota espera um array JSON contendo as localizações das quais serão calculadas as distâncias. A API aceita vários formatos de endereço.
Certifique-se de substituir `YOUR_API_KEY` com a sua [API key](https://developers.google.com/maps/documentation/geocoding/get-api-key)

Exemplo de entrada:
```json
[
  "1600 Amphitheatre Parkway, Mountain View, CA",
  "Av. Rio Branco, 1 Centro, Rio de Janeiro RJ",
  "manila",
  "rua desembargador berilo mota irararé"
]
```

Exemplo de resposta:
```json
{
	"farestDistance": {
		"addresses": [
			"Av. Rio Branco, 1 Centro, Rio de Janeiro RJ",
			"manila"
		],
		"distance": "18724.38 km"
	},
	"shortestDistance": {
		"addresses": [
			"Av. Rio Branco, 1 Centro, Rio de Janeiro RJ",
			"rua desembargador berilo mota irararé"
		],
		"distance": "1979.39 km"
	},
	"allDistances": [
		{
			"addresses": [
				"1600 Amphitheatre Parkway, Mountain View, CA",
				"Av. Rio Branco, 1 Centro, Rio de Janeiro RJ"
			],
			"distance": "11043.79 km"
		},
		{
			"addresses": [
				"1600 Amphitheatre Parkway, Mountain View, CA",
				"manila"
			],
			"distance": "13247.55 km"
		}, ...
	]
}
```
