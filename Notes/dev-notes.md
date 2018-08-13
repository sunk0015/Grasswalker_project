Usefule links


Installation on AWS EC2 (Linux Debian)
https://stackoverflow.com/questions/26053982/setup-script-exited-with-error-command-x86-64-linux-gnu-gcc-failed-with-exit
https://stackoverflow.com/questions/2813843/possible-reasons-for-timeout-when-trying-to-access-ec2-instance
https://stackoverflow.com/questions/26053982/setup-script-exited-with-error-command-x86-64-linux-gnu-gcc-failed-with-exit

Working on port 80
sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000

Essential tools
IDE - PyCharm (if you have a license), Atom, Sublime, etc
Putty - (Only if you're using a Windows)
Postman - API calls
Filezilla - File transfer to AWS servers (use Git for source code changes but sometimes need direct access)
