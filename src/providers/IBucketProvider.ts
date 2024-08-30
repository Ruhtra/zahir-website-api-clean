//TO-DO: REMOVER DEPENDENCIA AO MULTER
//TO-DO: REMOVER ANY DAS RESPONSES
export interface IBuketProvider {
  upload(fileKey: string, file: Express.Multer.File): Promise<any>;
  delete(fileKey: string): Promise<any>;
}
