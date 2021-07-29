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
        sh 'docker-compose  up -d '
      }
    }

    stage('tests') {
      parallel {
        stage('test karma') {
          steps {
            echo 'test with karma here'
          }
        }
        stage('SonarQube analysis') {
          def scannerHome = tool 'sonarqube';
          withSonarQubeEnv('sonarqube') { // If you have configured more than one global server connection, you can specify its name
            sh "${scannerHome}/bin/sonar-scanner"
        }
  }
      }
    }

 /*   stage('install') {
      agent {
        docker {
          image 'node:latest'
        }

      }
      steps {
        sh ' npm install '
        sh 'npm run ng build --prod'
        sh 'ls -a'

        sh 'pwd'
        sh 'cp  -r ./dist/ /usr/share/'
      }
    } */
/*     stage('copy') {
          agent any
          steps {
            sh 'ls -a'

            sh 'pwd'
            sh 'docker cp $PWD/dist/ front-app:/usr/share/nginx/html/'
          }
        }  */
  }
}
