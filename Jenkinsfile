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
        //sh ' npm install '
        //sh 'npm run ng build --prod'

      }
    }
    stage('copy to nginx') { 
      agent any
       steps {
         // sh 'docker cp node:/app/dist/theTipTop-front  /tmp'
          sh 'docker cp ./dist/theTipTop-front  front-app:/usr/share/nginx/html/'
      }
    } 

   
    
  }
}