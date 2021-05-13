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
        sh 'ls -a'
        sh 'pwd'
        sh ' npm install '
        sh 'npm run ng build --prod'
        sh 'ls -a'
     
        sh 'pwd'
      
      }
    }
    stage('copy') {
          agent any

          steps {
            sh 'ls -a'
     
            sh 'pwd'
            sh 'docker cp ./dist/theTipTop-front/ front-app:/usr/share/nginx/html/'
          }
        } 
  
    
  }
}