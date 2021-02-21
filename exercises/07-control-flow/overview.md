# CONTROL FLOW

You've seen how Ansible's declarative style implements loops and runs commands,
so it should come as no surprise that conditionals and includes are also
possible.

### WHEN

The [when] directive ensures a task only executes when the provided conditional
evaluates to true.

```
tasks:
 - debug:
     msg: You will always see me!
   when: True

 - debug:
     msg: You will never see me!
   when: False
```

In more complex Ansible configurations `when` is frequently used to augment
which tasks will execute based on the environment they are being run in.

For example, it is common to have a Vagrant development machine configured in
a slightly different manner than a production server using the same playbook.

If you find yourself using the same when statement for multiple tasks, consider
using a block.

### INCLUDE

Ansible also provides a means of including tasks that are defined in separate
files using [include]. Combining a `when` directive with `include` is
effectively like putting the when statement at the bottom of each task.

Included files are not defined as a playbook, but instead as only a list of
tasks. You can think of it like cutting and pasting the tasks from one file
into the source file at runtime. The included tasks have access to the same
context as the parent file.

While this is helpful for logical grouping of tasks into files, Ansible has a
much more powerful primitive for dealing with groups of tasks called [roles].
While roles won't be covered in this workshop the core concepts we have covered
should provide a solid foundation for independent experimentation.

## EXERCISE

Run this multiple times to see how the output is different. Also, try overriding
the `install_cowsay` variable at the command line when you run Ansible to see
how it affects the output.

```
ansible-playbook -i 10.10.10.10, playbook.yml
```

## LEARNING OBJECTIVES

- What is `when` and how do you use it?
- How do you extend a conditional over multiple tasks without defining the
  `when` conditional multiple times.
- How do you use blocks?
- How do you include tasks from external files?
- How do you pass variables at the command line to override variables?

[when]: http://docs.ansible.com/ansible/playbooks_conditionals.html#the-when-statement
[roles]: http://docs.ansible.com/ansible/playbooks_roles.html#roles
[Blocks]: http://docs.ansible.com/ansible/playbooks_blocks.html
[include]: http://docs.ansible.com/ansible/playbooks_roles.html#task-include-files-and-encouraging-reuse
