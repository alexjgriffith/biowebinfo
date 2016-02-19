From nginx
COPY nginx.conf /etc/nginx/nginx.conf
#COPY sites-enabled /etc/nginx/sites-enabled
EXPOSE 8000
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
CMD service nginx start
