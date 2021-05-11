pipeline {
    agent { 
        docker { image 'node:14-alpine' }
     }
    
    stages {
        stage('Checkout') {
             steps {
                deleteDir()
                checkout scm 
            }
        }
        /* stage('install compose') {
            steps {
                sh '''
                    docker-compose --version'''
            }
        } 
        stage('run compose') {
            steps {
                sh 'docker-compose  up -d'
            }
        }
        */
        
             
        stage('NPM Install') {
            steps{
                withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
                    sh 'npm install'
                }
            }
           
        }
        stage(' build prod') {
             steps {
                sh 'npm run build --prod'
            }
            
        }
    }
}
    
/*
    

    stage('NPM Install') {
        withEnv(["NPM_CONFIG_LOGLEVEL=warn"]) {
            sh 'npm install'
        }
    }

    stage('Test') {
        withEnv(["CHROME_BIN=/usr/bin/chromium-browser"]) {
          sh 'ng test --progress=false --watch false'
        }*/
        //junit '**/test-results.xml'
/*

    stage('Lint') {
        sh 'ng lint'
    }

    stage('Build') {
        milestone()
        sh 'ng build --prod --aot --sm --progress=false'
    }

    stage('Archive') {
        sh 'tar -cvzf dist.tar.gz --strip-components=1 dist'
        archive 'dist.tar.gz'
    }

    stage('Deploy') {
        milestone()
        echo "Deploying..."
    }
} */