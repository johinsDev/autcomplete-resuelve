# autcomplete-resuelve

## Problema
- Buscador con autocompletado consumiendo el api de Ghibli studio [api](https://ghibliapi.herokuapp.com/#section/Getting-Started)
## Modulos
- El proyecto utiliza monorepo para gestionar los paquetes, a su vez se hace uso de varios linters y hooks para la validacion
se utiliza travis como CI/CD, con despliegue hacia cloudfront de amazon, las librerias principales es ramda para el manejo de arrays y objetos,
el uso de tailwind para maquetar y dixie para usar el api de indexDB del navegador
## Trade-offs
-  Como gran ventaja se cargan todas las peliculas del API en el indexdb del navegador lo que hace el buscador muy rapido, la decicion
fue porque el api no provee una funciona de busqueda de films y al ser tan pequeña no genera tantos problemas descargar toda la data en local,
sin embargo el componente principal tambien permite fetch hacia un api, con el tiempo se podrian mejorar la tecnica de cache, como tambien,
hacer mad dinamico el componente autocomplete
## [ Link al codigo](https://github.com/johinsDev/autcomplete-resuelve/blob/master/packages/web/src/utils/useFilms.tsx)
## [ Link al demo](https://johinsdev.com)
