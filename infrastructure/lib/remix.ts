import * as cdk from 'aws-cdk-lib'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3_deployment from 'aws-cdk-lib/aws-s3-deployment'
import {Construct} from 'constructs'
import {RemixDistribution} from './remix-distribution.js'
import {RemixServer} from './remix-server.js'

type RemixConstructProperties = {
  server: string;
  publicDir: string;
}

export class RemixConstruct extends Construct {
  constructor(scope: Construct, id: string, properties: RemixConstructProperties) {
    super(scope, id)

    const remixBucket = new s3.Bucket(this, 'StaticBucket', {
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    const remixServer = new RemixServer(this, 'RemixServer', {
      server: properties.server,
    })

    const remixDistribution = new RemixDistribution(this, 'RemixDistribution', {
      serverApiUrl: remixServer.apiUrl,
      bucket: remixBucket,
    })

    new s3_deployment.BucketDeployment(this, 'RemixBucketDeployment', {
      sources: [s3_deployment.Source.asset(properties.publicDir)],
      destinationBucket: remixBucket,
      distribution: remixDistribution.distribution,
    })

    new cdk.CfnOutput(this, 'RemixCloudfrontDomainName', {
      value: remixDistribution.distribution.distributionDomainName,
    })
  }
}
