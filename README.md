# Redis module for Microframework

Adds integration between [redis](https://github.com/NodeRedis/node_redis) and
[microframework](https://github.com/pleerock/microframework).

## Usage

1. Install module:

    `npm install --save microframework-redis`

2. Simply register module in the microframework when you are bootstrapping it.
    
    ```typescript
        import {MicroFrameworkBootstrapper} from "microframework";
        import {RedisModule} from "microframework-redis";
        
        new MicroFrameworkBootstrapper({ baseDirectory: __dirname })
            .registerModules([
                new RedisModule()
            ])
            .bootstrap()
            .then(result => console.log('Module is running.'))
            .catch(error => console.error('Error: ', error));
    ```

3. ES6 features are used, so you may want to install [es6-shim](https://github.com/paulmillr/es6-shim) too:

    `npm install es6-shim --save`

    you may need to `require("es6-shim");` in your app.

4. Now you can use redis module in your microframework.

## Todos

* cover with tests
* more configuration
* add more docs