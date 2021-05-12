pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout scm
      }
    }

    stage('run compose') {
      steps {
        sh 'docker-compose  up -d'
      }
    }

    stage('install') {
      agent {
        docker {
          image 'node:latest'
        }

      }
      steps {
        sh ' npm install '
        sh 'npm run ng build --prod'
      }
    }

    stage('copy to nginx') {
      agent any
       steps {
          sh 'docker cp --from=node /app/dist/theTipTop-front /usr/share/nginx/html'
      }
    }
    
  }
}