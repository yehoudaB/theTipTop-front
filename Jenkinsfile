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
        sh 'docker-compose  up -d --no-deps --build  --force-recreate'
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
          steps {
            script {
              scannerHome = tool 'sonarqube'
              sh 'ls -a'
            }
            withSonarQubeEnv('sonarqube') {
              sh "${scannerHome}/bin/sonar-scanner"
            }
        }
      }

      }
    }
  }
}