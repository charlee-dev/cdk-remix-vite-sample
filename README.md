# CDK Remix Vite Project 🚀

This project is a cutting-edge Remix application utilizing Vite for the frontend and AWS CDK for robust infrastructure management. It showcases how to build and deploy a full-stack application leveraging cloud resources for optimal performance and scalability.

## Prerequisites 📋

Ensure you have the following tools installed before you begin:
- **Node.js** (v20.0.0 or higher) 🟢
- **npm** 📦
- **AWS CLI** 🛠️
- **AWS CDK** 🌐

## Getting Started 🏁

To set up the project, follow these steps:

```sh
Clone the repository
git clone <repository-url>
Install dependencies in the root directory
npm install
```

Navigate to the infrastructure directory and install dependencies

```sh
cd infrastructure
npm install
Return to the root directory
cd ..
```

## Development 🛠

Kickstart the development server with:

```sh
npm run dev
```

This command fires up the Remix app in development mode, enabling hot reloading for a seamless coding experience.

## Building the Application 🏗️

Prepare the application for production:

```sh
npm run build
```

This script compiles both the Remix application and the AWS Lambda function, ensuring they are ready for deployment.

## Deployment 🚀

Deploy your application to AWS with ease:

```sh
npm run deploy
```

This command orchestrates your infrastructure and application deployment using AWS CDK, streamlining the process without requiring manual approvals.

## Architecture 🏠

The application operates on AWS, utilizing the following services:
- **Amazon S3**: Hosting static files 📦
- **AWS Lambda**: Handling server-side logic ⚙️
- **Amazon API Gateway**: Managing requests as a proxy in front of AWS Lambda 🌐
- **Amazon CloudFront**: Ensuring fast content delivery 🚅

## Configuration ⚙️

Adjust the `cdk.json` file as necessary to tailor the AWS CDK deployment to your specific needs.

## Contributing 🤝

We welcome contributions! Please fork the repository and submit a pull request with your innovative changes.

## License 📄

This project is proudly licensed under the MIT License - see the [LICENSE](LICENSE) file for details.