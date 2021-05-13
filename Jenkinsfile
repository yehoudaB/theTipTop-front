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

   
    stage('copy') {
          agent any

          steps {
            sh 'ls -a'
     
            sh 'pwd'
            sh 'docker cp ./ front-app:/usr/share/nginx/code-source/'
          }
        } 
   stage('install') {
      agent {
        docker {
          image 'node:latest'
        }

      }
      steps {
        sh 'ls -a'
        sh 'pwd'
        sh ' npm install '
        sh 'npm run ng build --prod'
        sh 'ls -a'
     
        sh 'pwd'
        sh 'cp /usr/share/nginx/code-source/dist/theTipTop-front /usr/share/nginx/html/
      }
    }
    
  }
}