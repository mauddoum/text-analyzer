$BOX = "centos/7"
$IP = "10.0.0.10"
$MEMORY = ENV.has_key?('VM_MEMORY') ? ENV['VM_MEMORY'] : "1024"
$CPUS = ENV.has_key?('VM_CPUS') ? ENV['VM_CPUS'] : "1"

Vagrant.configure("2") do |config|
  config.vm.hostname = "text-analyzer.dev"
  config.vm.box = $BOX
  config.vm.network :private_network, ip: $IP
  config.vm.network "public_network"
  config.ssh.forward_agent = true

  config.vm.synced_folder ".", "/var/www/text-analyzer/current", nfs: true

  config.vm.provider "virtualbox" do |v|
    v.name = "text-analyzer"
    v.customize ["modifyvm", :id, "--cpuexecutioncap", "99"]
    v.customize ["modifyvm", :id, "--memory", $MEMORY]
    v.customize ["modifyvm", :id, "--cpus", $CPUS]

  end

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "provisioning/playbook.yml"
    ansible.sudo = true
    ansible.limit = "all"
  end

end
