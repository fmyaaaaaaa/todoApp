Vagrant.configure("2") do |config|
  config.vm.define "webDev" do |node|
    node.vm.box = "ubuntu/trusty64"
    node.vm.hostname = "webDev"
    node.vm.network :forwarded_port, guest: 22, host: 5000, id: "ssh"
    node.vm.network :private_network, ip:"192.168.33.5"
    node.vm.network :private_network, ip:"192.168.33.5", id: "http"
  end
  config.vm.define "db001" do |node|
    node.vm.box = "ubuntu/trusty64"
    node.vm.hostname = "db001"
    node.vm.network :private_network, ip: "192.168.33.10"
    node.vm.network :forwarded_port, guest: 22, host: 7000, id: "ssh"
  end
  config.vm.define "app001" do |node|
    node.vm.box = "ubuntu/trusty64"
    node.vm.hostname = "ap001"
    node.vm.network :private_network, ip: "192.168.33.15"
    node.vm.network :forwarded_port, guest: 22, host: 9000, id: "ssh"
  end
  config.vm.define "dbMng" do |node|
    node.vm.box = "ubuntu/trusty64"
    node.vm.hostname = "dbMng"
    node.vm.network :private_network, ip: "192.168.33.20"
    node.vm.network :forwarded_port, guest: 22, host: 2000, id: "ssh"
  end
end
