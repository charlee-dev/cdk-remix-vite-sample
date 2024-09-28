import path from 'path'
import { fileURLToPath } from 'url'
import * as cdk from 'aws-cdk-lib'
import {type Construct} from 'constructs'
import { RemixConstruct } from './lib/remix'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, properties?: cdk.StackProps) {
    super(scope, id, properties)

    console.log('dirname', __dirname)
    new RemixConstruct(this, 'Remix', {
      publicDir: path.join(__dirname, '../build/client'),
      server: path.join(__dirname, '../build/lambda/index.cjs'),
    })
  }
}

// const env = {
//   account: process.env.CDK_DEFAULT_ACCOUNT,
//   region: process.env.CDK_DEFAULT_REGION,
// }

const app = new cdk.App()
new InfrastructureStack(app, 'CdkRemixViteStack', {
  // env,
})
