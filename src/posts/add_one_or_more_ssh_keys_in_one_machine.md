---
title: 'Add Multiple ssh keys in one machine'
description: 'How to add multiple ssh keys in one machine, one for personal and the other for work'
image: https://images.unsplash.com/photo-1464062198447-e6e5c40c43c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1394&q=80
tags: ['tips', 'git']
date: 2021-01-18
---

<center>

![railway](https://images.unsplash.com/photo-1464062198447-e6e5c40c43c5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1394&q=80)

<span><small><span>Photo by <a href="https://unsplash.com/@thesollers?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Anton Darius</a> on <a href="https://unsplash.com/s/photos/railway?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span></small></span>

</center>


In this post i will explain how to add one or more ssh keys in one machine, use one for personal use and the others for work. I will explain it for gihub but the steps can be applicable for any git providers.


Before we start you have to install git first.

#### View exist ssh keys

```bash
$ ls -al ~/.ssh
```

#### Generate new ssh key

After running this command it will generate two file public/private keys

```bash
$ cd ~/.ssh
$ ssh-keygen -t rsa -f "id_rsa_personal_github"    # for personal account
$ ssh-keygen -t rsa -f "id_rsa_work_github"         # for work account
```

#### Adding the new SSH key to the corresponding (GitHub, Bitbuckt or Gitlab) account

* Copy generated key(s) to clipboard

```bash
$ clip < ~/.ssh/id_rsa_personal_github.pub          # for github account
$ clip < ~/.ssh/id_rsa_work_github.pub               # for gitlab account
```

* Add clipboard to github accounts:

1. Go to Settings
2. Select SSH and GPG keys from the menu to the left.
3. Click on New SSH key, provide a suitable title, and paste the key in the box below
4. Click Add key — and you’re done! 

#### Registering the new SSH Keys with the ssh-agent

```bash
# start the ssh-agent in the background
$ eval $(ssh-agent -s)
Agent pid 59566

$ ssh-add ~/.ssh/id_rsa_personal_github    # for personal account
$ ssh-add ~/.ssh/id_rsa_work_github        # for work account
```

#### Creating the SSH config file

Using this file to tell git installed on your machine what key to use when pushing to upstream.

```bash
cd ~/.ssh/
$ touch config           # Create the file if not exists
$ code config            # Open the file in VS code or use any editor
```

> config file

```js
# Personal GitHub Account
Host github.com
   HostName github.com
   User git
   IdentityFile ~/.ssh/id_rsa_personal_github
# Work GitLab Account
Host gitLab.com    
   HostName gitLab.com 
   User git
   IdentityFile ~/.ssh/id_rsa_work_github
```

### Resources

* [Setup SSH Key - GitHub](https://docs.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
* [Setup SSH Key - bitbucket](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/)
* [Setup SSH Key - Gitlab](https://docs.gitlab.com/ee/ssh/)
* [SSH Crash Course](https://www.youtube.com/watch?v=hQWRp-FdTpc)
* [Git & GitHub Crash Course For Beginners](https://www.youtube.com/watch?v=SWYqp7iY_Tc)
