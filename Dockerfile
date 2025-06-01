FROM mongo:4.4.7
RUN echo "rs.initiate()" > /docker-entrypoint-initdb.d/replace-init.js
CMD ["--replSet","rs"]