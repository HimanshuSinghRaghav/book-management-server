import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { readFile } from 'fs/promises';
 
const swaggerDocument = JSON.parse(
  await readFile(new URL('./openapi.json', import.meta.url))
);

function swaggerDocs(app , port){
    app.use('/api/docs' , swaggerUi.serve , swaggerUi.setup(swaggerDocument))
}

export default swaggerDocs
