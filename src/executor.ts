import childProcess, { ExecException, ExecOptions } from 'child_process';

export const generateCommand = (createdTsconfig: boolean) => {
  return `tsc -p ./tsconfig.declarator.json ${
    !createdTsconfig ? '--emitDeclarationOnly' : ''
  }`;
};

type CommandResult = [string, null] | [null, { err: ExecException; stderr: string }];

export const executeCommand = (
  line: string,
  options: ExecOptions
): Promise<CommandResult> => {
  return new Promise((resolve) => {
    childProcess.exec(line, options, (err, stdout, stderr) => {
      if (err) {
        resolve([null, { err, stderr }]);
      } else {
        resolve([stdout, null]);
      }
    });
  });
};
