import childProcess, { ExecException, ExecOptions } from 'node:child_process';

type CommandResult =
  | [stdout: string, error: null]
  | [stdout: null | string, error: { err: ExecException; stderr: string }];

export function childExec(cmd: string, options: ExecOptions): Promise<CommandResult> {
  return new Promise((resolve) => {
    childProcess.exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        resolve([stdout || null, { err, stderr }]);
      } else {
        resolve([stdout, null]);
      }
    });
  });
}
