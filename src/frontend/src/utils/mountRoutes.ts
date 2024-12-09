import fs from "fs";
import path from "path";

type PageInfo = {
  path: string;
  component?: any; // Função exportada como padrão
  children?: PageInfo[]; // Representa páginas, layouts ou subpastas
};

export const analyzePagesFolder = (pagesFolderPath: string): PageInfo[] => {
  function processDirectory(directory: string, parentPath: string): PageInfo[] {
    const items = fs.readdirSync(directory);
    const result: PageInfo[] = [];
    let layoutComponent: any = null; // Layout da pasta atual
    let pageComponent: any = null; // Página da pasta atual

    items.forEach((item) => {
      const itemPath = path.join(directory, item);
      const relativePath = parentPath ? `${parentPath}/${item}` : `/${item}`;
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory()) {
        // Processar subpastas recursivamente
        const children = processDirectory(itemPath, relativePath);
        result.push(...children);
      } else if (stat.isFile()) {
        if (item.includes("layout") && item.endsWith(".tsx")) {
          // Identificar arquivos de layout
          layoutComponent = require(itemPath).default;
        } else if (item.includes("page") && item.endsWith(".tsx")) {
          // Identificar arquivos de página
          pageComponent = require(itemPath).default;
        }
      }
    });

    if (layoutComponent) {
      // Se houver um layout, encapsular o conteúdo em um objeto com layout
      const layoutNode: PageInfo = {
        path: parentPath,
        component: layoutComponent,
        children: [],
      };

      if (pageComponent) {
        // Adicionar a página como filho do layout
        layoutNode.children!.push({
          path: parentPath,
          component: pageComponent,
        });
      }

      // Adicionar outros nós filhos ao layout
      layoutNode.children!.push(...result);
      return [layoutNode];
    } else if (pageComponent) {
      // Se não houver layout, adicionar apenas a página
      return [
        {
          path: parentPath,
          component: pageComponent,
        },
      ];
    } else {
      // Retornar apenas nós filhos, caso não haja página ou layout na pasta
      return result;
    }
  }

  // Iniciar o processamento a partir da pasta 'pages'
  return processDirectory(pagesFolderPath, "");
};

// Exemplo de uso
const pagesFolderPath = path.join(__dirname, "src", "pages");
const result = analyzePagesFolder(pagesFolderPath);

console.log(JSON.stringify(result, null, 2));
