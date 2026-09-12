/**
 * Tipagem dos CSS Modules.
 *
 * Projetos Vite que já incluem `vite/client` e projetos Next já têm isso — nesse
 * caso pode apagar o arquivo. Ele está aqui para o kit compilar sozinho em
 * qualquer setup TypeScript.
 */
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
