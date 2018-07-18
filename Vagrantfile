Vagrant.configure("2") do |config|
  # These tasks are run on both the controller and the host
  shared_provisioning = [
    "echo \"#{File.read(File.join(__dir__, 'ssh/vagrant.key'))}\" >> /home/vagrant/.ssh/authorized_keys",
    'grep -q -F target /etc/hosts || (printf "%s\n" "10.10.10.10 target" | sudo tee -a /etc/hosts) &> /dev/null',
    'grep -q -F target /etc/hosts || (printf "%s\n" "10.10.10.100 controller" | sudo tee -a /etc/hosts) &> /dev/null',
  ]

  # This VM is provided for Windows users who would otherwise need to install
  # Ansible using the Linux Subsystem for Windows.
  config.vm.define "controller", primary: true do |vb|
    vb.vm.box = "bento/centos-7.4"
    vb.vm.synced_folder '.', '/mnt'
    vb.vm.network :private_network, ip: '10.10.10.100'
    vb.vm.provider "virtualbox" do |v|
      v.customize ["modifyvm", :id, "--cableconnected1", "on"]
    end
    vb.vm.provision "shell", inline: [
      'echo Bootstrapping controller, this may take some time...',
      'sudo yum install -y install epel-release &> /dev/null',
      'sudo yum install -y ansible &> /dev/null',
      'echo cd /mnt/exercises >> /home/vagrant/.bash_profile',
      'hostname controller',
      shared_provisioning,
      'echo Bootstrapping complete.'
    ].flatten.join("\n")
    vb.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
    vb.ssh.insert_key = false
    vb.ssh.forward_agent = true
  end

  config.vm.define "target" do |vb|
    vb.vm.box = "bento/centos-7.4"
    vb.vm.network :private_network, ip: '10.10.10.10'
    vb.vm.provider "virtualbox" do |v|
      v.customize ["modifyvm", :id, "--cableconnected1", "on"]
    end
    vb.vm.provision "shell", inline: [
      'hostname target',
      shared_provisioning,
    ].flatten.join("\n")
    vb.ssh.shell = "bash -c 'BASH_ENV=/etc/profile exec bash'"
    vb.ssh.insert_key = false
    vb.ssh.forward_agent = true
  end
end
