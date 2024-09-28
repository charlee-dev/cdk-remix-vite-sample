import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as cloudfront_origins from 'aws-cdk-lib/aws-cloudfront-origins'
import type * as s3 from 'aws-cdk-lib/aws-s3'
import {Construct} from 'constructs'

type RemixDistributionProperties = {
  bucket: s3.IBucket;
  serverApiUrl: string;
}

export class RemixDistribution extends Construct {
  public readonly distribution: cloudfront.Distribution
  constructor(scope: Construct, id: string, properties: RemixDistributionProperties) {
    super(scope, id)

    const bucketOriginAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      'BucketOriginAccessIdentity',
    )
    properties.bucket.grantRead(bucketOriginAccessIdentity)

    const createS3OriginConfig = () => ({
      allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
      cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      compress: true,
      origin: new cloudfront_origins.S3Origin(properties.bucket, {
        originAccessIdentity: bucketOriginAccessIdentity,
      }),
      viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    });

    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      enableLogging: false,
      defaultBehavior: {
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        compress: true,
        origin: new cloudfront_origins.HttpOrigin(properties.serverApiUrl),
        originRequestPolicy:
          cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      additionalBehaviors: {
        'assets/*': createS3OriginConfig(),
        'images/*': createS3OriginConfig(),
        'favicon.ico': createS3OriginConfig(),
      },
    })
  }
}
