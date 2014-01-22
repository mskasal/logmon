#!/usr/bin/env bash
apt-get update
apt-get install -y python-software-properties
add-apt-repository -y ppa:ondrej/php5
apt-get update

# APACHE
apt-get install -y apache2
rm -rf /var/www
ln -s /vagrant /var/www
a2enmod rewrite
VHOST=$(cat <<EOF
<VirtualHost *:81>
  servername localhost
  ServerAdmin webmaster@localhost
  DocumentRoot /var/www/
  <Directory /var/www/>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride all
    Order allow,deny
    allow from all
  </Directory>

  ErrorLog \${APACHE_LOG_DIR}/error.log
  
  # Possible values include: debug, info, notice, warn, error, crit,
  # alert, emerg.
  LogLevel warn

  CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
<VirtualHost *:80>
  servername localhost
  ServerAdmin webmaster@localhost
  DocumentRoot /var/www/web/
  <Directory /var/www/web>
    Options Indexes FollowSymLinks MultiViews
    AllowOverride all
    Order allow,deny
    allow from all
  </Directory>

  ErrorLog \${APACHE_LOG_DIR}/error.log
  
  # Possible values include: debug, info, notice, warn, error, crit,
  # alert, emerg.
  LogLevel warn

  CustomLog \${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
EOF
)
echo "${VHOST}" | sudo tee /etc/apache2/sites-enabled/000-default*
echo "listen 80" | sudo tee  /etc/apache2/ports.conf
echo "listen 81" | sudo tee -a /etc/apache2/ports.conf


# PHP
apt-get install -y php5 php5-curl php5-gd php5-dev php-pear
pecl install mongo
echo "extension=mongo.so" | sudo tee -a /etc/php5/mods-available/mongo.ini
ln -s /etc/php5/mods-available/mongo.ini /etc/php5/cli/conf.d/mongo.ini
ln -s /etc/php5/mods-available/mongo.ini /etc/php5/apache2/conf.d/mongo.ini


# MONGODB
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
sudo apt-get update
sudo apt-get install -y mongodb-10gen


#TOOLS
apt-get install -y curl


# GIT
apt-get install -y git-core
apt-get install -y vim


# Install Composer
curl -s https://getcomposer.org/installer | php
# Make Composer available globally
mv composer.phar /usr/local/bin/composer


# botApps bootstrap
cd /var/www/ && composer update


# restart services
service apache2 restart


#cronjobs
# NOTE: the jobs will be executed by root
crontab -l | { cat; echo "*/3 * * * * cd /var/www/Jobs && php Crawler.php"; } | crontab -
crontab -l | { cat; echo "*/3 * * * * cd /var/www/Jobs && php SentimentWorker.php"; } | crontab -
