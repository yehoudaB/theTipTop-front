pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        deleteDir()
        checkout scm
      }
    }

/*     stage('remove old node') { 
       steps {
          sh 'docker rm node'
      }
    } */
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

   
    
  }
}