import fs from 'fs';

export class ManipulateFile {
  copyFile(from: string, to: string): void {
    fs.copyFileSync(from, to);
  }
}
