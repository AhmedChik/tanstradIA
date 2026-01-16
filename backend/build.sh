#!/usr/bin/env bash
# exit on error
set -o errexit

# Install Python dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Install gunicorn for production server
pip install gunicorn psycopg2-binary

echo "Build completed successfully!"
