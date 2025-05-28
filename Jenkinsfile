pipeline {
  agent any

  environment {
    DOCKER_IMAGE = 'msalihogun/visitor-counter:latest'
  }

  stages {
    stage('Clone Repo') {
      steps {
        checkout scm
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $DOCKER_IMAGE .'
      }
    }

    stage('Push Docker Image') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
          sh '''
            echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh 'kubectl apply -f redis-deployment.yaml'
        sh 'kubectl apply -f redis-service.yaml'
        sh 'kubectl apply -f frontend-deployment.yaml'
        sh 'kubectl apply -f frontend-service.yaml'
      }
    }
  }
}

