# SERVICES, TEMPLATES, AND REGISTERING VARIABLES

Say you've written an application and you'd like to make it available on the
internet. So, you copy the application to your server, start it, and walk away.
Success ...right!?

Not quite.

While this approach could work in theory, in practice it is inadvisable for many
reasons. Here are a few:

- If the application crashes for any reason, you'll have to restart it manually.
- If the server is restarted, the application will not start at startup.
- There is no standard way to start, stop, restart, or check the status of the
  application. You may understand it, but what about future operators?
- Unless you took care to pipe the output somewhere, there will be no record of
  the application's activity.

## SERVICES

Typically speaking, the easiest way to handle all of these concerns is to use
the default "init system" that ships with the OS on the server.

At the time of this writing, this workshop targets CentOS 7.3. As a result,
the init system we will be using to create our service will be systemd. The
code below is a very minimal example of a service script for systemd.

```
[Unit]
Description=node app
After=network.target

[Service]
Type=simple
Restart=always
ExecStart={{ which_node.stdout | default('/usr/bin/node') }} {{ node_app_path }}
```

If this text was placed at `/etc/systemd/system/app.service`, it would become
the "app" service. After being enabled, it would automatically start at startup,
stop at shutdown, and re-spawn if it crashes.

It would also become possible to control via the `systemctl` command.

For example:
```
sudo systemctl enable app
sudo systemctl start app
sudo systemctl stop app
sudo systemctl restart app
sudo systemctl status app
```

### LOGGING

Systemd provides a utility for viewing logs. To watch the running output of the
aforementioned application, try the command `sudo journalctl -u -f app`.

## TEMPLATES

In our previous exercise `variables-loops-and-filters` we mentioned that Ansible
utilizes the Jinja2 templating engine. This means it can compile template files
and copy them to a remote server using the [template module]:

```
- name: install service
  template:
    src: app.service.j2                     # template on control machine
    dest: /etc/systemd/systemd/app.service  # configuration on target host
```

Templates have access to all variables defined in a playbook. They will be
interpolated if they are wrapped in curly brackets, like so: `{{ var_name }}`.

The default filter can be handy if you wish to provide a default:

```
{{ var_name | default('Some Default Value') }}
```

## REGISTERING VARIABLES

All Ansible tasks have output. That output can be stored in a variable by
using the `register` directive. Just like variables defined at the top of a
playbook, these can be referenced in templates, conditionals, loops, etc.

Here is a simple example, registering the output of a command to a variable:

```
- command: which node
  register: which_node

- debug:
    var: which_node
```

Note that the output of the command is **not** the only thing stored. In
addition to capturing stdout, you can also access the return code, stderr,
the start and end time and more.

## EXERCISE

In this exercise we'll configure a service to run a small NodeJS application
and serve it via NGINX.

Populate the systemd script (`app.service.j2`) with template references that
accept variables containing the full path to the NodeJS runtime and the
application script (`app.js`).

Then, refactor the included playbook to `register` the needed variables before
the template task is called.

You'll know you've been successful when you're able to visit http://10.10.10.10
and your deployment scripts are using templates and variables.

## Learning Objectives
 - What is systemd for, and why should it be used?
 - How do you view logs for a systemd service?
 - How do you control a service with Ansible?
 - What is the templating engine used by Ansible?
 - How do you interpolate a variable into a template?
 - How can variables be registered during the Ansible run?

[template module]: http://docs.ansible.com/ansible/template_module.html
