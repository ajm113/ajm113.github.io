# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.hostname = "mcrobbinfo"
    config.vm.network "private_network", ip: "192.168.33.22"
    config.vm.synced_folder ".", "/var/www", :mount_options => ["dmode=777", "fmode=666"]

    config.vm.network "forwarded_port", guest: 8080, host: 8080

end
