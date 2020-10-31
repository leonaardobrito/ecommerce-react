Estrutura básica da API:
- config: arquivos json de configuração, nome do DB, IP, domínio de acesso, token para integração com pagseguro, o segredo para gerar token de segurança fica aqui.
- controllers:  controla todas as categorias do sistema
- - integrações: integração com pagseguro e correios
- - validações: validações de post, de segurança etc
- helpers: calculos matemáticos e replacers
- models: contem os esquemas de tabelas do mongoose
- public:  arquivos acessados por qualquer cliente no servidor
- - css
- - images
- routes
- - api: endpoints da API
- test
- views


-------------------

