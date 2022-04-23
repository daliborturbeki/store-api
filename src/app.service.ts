import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  doTransaction(amount: number, sender: string, reciever: string) {
    // read amount, sender and reciever from body of POST req
    // and use it to call python script
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { PythonShell } = require('python-shell');

    const pyshell = new PythonShell('src/sys.py');

    pyshell.send(
      JSON.stringify({ amount: amount, sender: sender, reciever: reciever }),
    );

    pyshell.on('message', function (message) {
      console.log(message);
    });

    pyshell.end(function (err, code, signal) {
      if (err) {
        throw err;
      }
      console.log('finished');
    });
  }

  
}
