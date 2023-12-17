**Sobre Webpack**

Junta os arquivos javascript em um ou mais arquivos, dependendo da estratégia utilizada.

Configura-se um arquivo de entrada e um de saída, inicialmente.

./src e ./dist são os padrões do webpack.

Com a flag nxp webpack --watch temos o auto-refresh do javascript a princípio.

É possível adicionar vários arquivos javascript ao main.js. Basta um array no ```entry :[]``` do webpack.config.js

**Typescript**

É necessário configurar um módulo para interpretar arquivos typescript.

```
module: {
  rules: [
    {
      test: /\.ts$/,
      exclude: /node_modules/,
      use: 'ts-loader'
    }
  ]
}
  ```
Um resolver faz o trabalho de procurar os arquivos JS e TS para interpretar. Por isso não é necessário colocar nos imports a terminação do arquivo.

```
  resolve: {
    extensions: ['.ts','.js']
  },
```

Webpack inclui automaticamente os arquivos javascript no html.

```
  plugins:[
    new HtmlWebpackPlugin({template:'./src/index.html'})
  ],
```

**CSS Loader**
css-loader processa o css. style-loader injeta o css processado dentro do javascript.

```
{
  test: /\.css$/,
  exclude: /node_modules/,
  use: ['style-loader','css-loader']
  //loader são processados do último para o primeiro        
},
```

obs: Os arquivos css tem que ser importados no arquivo TS. É possível separar o css do bumdle JS usando um loader diferente do style-loader. No caso, *mini-css-extract-plugin*.

**Webpack auto prefixer**

Adiciona prefixos ao css de para que o css seja compatível com as diversas versões de browser.

**Copy Loader**

É um plugin que copia os arquivos de uma pasta específica direto para a pasta dist.

```
new CopyPlugin({
  patterns: [{
    from: './src/images',
    to: 'images'
  }]
})
```
**Config images**

O módulo do tipo ```asset/resource``` copia os arquivos para a pasta dist e renomeia dentro do html. Já o tipo ```asset/inline``` joga o base64 entro do html, dispensando a configuração de filename.
```
{
  test: /\.(png|jpg|svg|jpeg|gif)$/i,
  type: 'asset/resource',
  generator: {
    filename: 'images/[hash]-[name][ext]'
  }
},
```

**BundleAnalyzerPlugin** 

Plugin que analisa o resultado do bundle por pedaço de código.

**Proxy**

Tudo que for solicitado a /api será direcionado para localhost:3000

```
devServer: {
    watchFiles: ["src/**/*", "index.html"],
    static: "./dist",
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api':''}
      }
    }
},
```


