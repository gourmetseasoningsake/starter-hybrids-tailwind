type pojo = { [key: string]: any }


/* utils/cli.js */
type isRunningFromCli = (nodePath: string, modulePath: string) => boolean
type parseArgs = (args: string[]) => { [key: string]: string | boolean }



/* utils/config.js */
type configFrom = (_: {
  mode: string,
  modes: string[],
  config: pojo
}) => pojo



/* utils/env.js */
type envFrom = (mode: string, prefixes?: string[]) => {
  mode: string,
  entries: Record<string, string>,
  var: (key: string) => string
}



/* utils/object.js */
type omitProp = (obj: pojo, key: string) => pojo
type proxyLiteralsByKey = (_: {
  key: string,
  keys: string[],
  obj: pojo
}) => pojo



/* utils/task.js */
type prependTitleToLine = (line: string, title: string) => string
type command = (_: {
  cmd: string,
  title?: string,
  args?: string[] | ((env: pojo) => string[]),
  stdout?: boolean | ((_: { 
      env: pojo,
      title: string,
      content: string,
      log: ((content: string) => void),
      res: ((otherValus?: pojo) => PromiseLike<pojo>)
      rej: ((reason?: any) => void)
    }) => any),
  wait?: boolean;
  options?: pojo | ((env: pojo) => pojo);
}) => (env: pojo, prevValues?: pojo) => Promise<pojo>