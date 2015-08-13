#!/bin/bash

CERT_DIR=certs # directorio donde guardar los archivos
BASE_NAME=quiz-2015 # prefijo para el nombre de los archivos

KEY_FILE=$BASE_NAME-key.pem
CSR_FILE=$BASE_NAME-csr.pem
CERT_FILE=$BASE_NAME-cert.pem

mkdir -p $CERT_DIR && cd $CERT_DIR

# generamos la clave privada
openssl genrsa -out $KEY_FILE 2048
# generamos la solicitud de firma
openssl req -new -sha256 -key $KEY_FILE -out $CSR_FILE
# generamos el certificado x509
openssl x509 -req -in $CSR_FILE -signkey $KEY_FILE -out $CERT_FILE
