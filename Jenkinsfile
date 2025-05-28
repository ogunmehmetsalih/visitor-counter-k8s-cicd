pipeline {
  agent any

  environment {
    IMAGE_NAME = "msalihogun/visitor-counter:latest"
    KUBECONFIG = "${HOME}/.kube/config"
  }

  stages {
    stage('Checkout') {
      steps {
        git url: 'https://github.com/ogunmehmetsalih/visitor-counter-k8s-cicd.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME .'
      }
    }

    stage('Push to DockerHub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $IMAGE_NAME
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          kubectl apply -f redis-deployment.yaml
          kubectl apply -f redis-service.yaml
          kubectl apply -f frontend-deployment.yaml
          kubectl apply -f frontend-service.yaml
        '''
      }
    }
  }
}

