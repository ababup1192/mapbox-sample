FROM dockerfile/nodejs

RUN npm install -g gulp
RUN npm install -g bower

WORKDIR /data

RUN npm install gulp
RUN npm install gulp-util
RUN npm install main-bower-files
RUN npm install gulp-connect
RUN npm install gulp-flatten
RUN npm install gulp-filter
RUN npm install gulp-plumber
RUN npm install coffee-script
RUN npm install gulp-jade
RUN npm install gulp-coffee
RUN npm install gulp-sass

ADD gulpfile.js /data/gulpfile.js
ADD gulpfile.coffee /data/gulpfile.coffee
ADD bower.json /data/bower.json

VOLUME ["/data/jade"]
VOLUME ["/data/coffee"]
VOLUME ["/data/sass"]
VOLUME ["/data/dist"]

EXPOSE 8080

RUN bower --allow-root install
RUN gulp bower

CMD ["gulp"]

