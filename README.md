

#### Fleet
Fleet can be called directly and asked about machines and units.

    http://128.199.190.70:7070/v1-alpha/machines
    {"machines":[{"id":"0277bc7109c84589be8bdf3ce58ba01d","primaryIP":"169.254.30.228"},{"id":"dc7d6423c97843d29b704911f187d18c","primaryIP":"169.254.156.94"},{"id":"f3f94fdeb45040cbb0c513d1fe694301","primaryIP":"169.254.13.134"}]}

However it gives internal IP Addresses which does not match the stated private or public IP addresses stated by Digital Ocean. This address doesn't match `ifconfig` and cannot be pinged (no route to host) as the netmask indicates a different subdomain.

This interface needs to be enabled when starting the CoreOS server, using the fleet.socket unit as below...

	coreos:
	  etcd:
	    discovery: https://discovery.etcd.io/21c642a255f72bd566439367785cc45c
	    addr: $private_ipv4:4001
	    peer-addr: $private_ipv4:7001
	  units:
	    - name: etcd.service
	      command: start
	    - name: fleet.socket
	      command: start
	      content: |
	        [Socket]
	        ListenStream=7070
	        Service=fleet.service

	        [Install]
	        WantedBy=sockets.target

	    - name: fleet.service
	      command: start

[Simple Example](https://github.com/coreos/fleet/blob/master/Documentation/examples/api.py)
[API](https://github.com/coreos/fleet/blob/master/Documentation/api-v1-alpha.md)
[Discovery Document](https://github.com/coreos/fleet/blob/master/schema/v1-alpha.json) describes the API formally.

#### cadvisor
[cadvisor](https://github.com/google/cadvisor) is a docker container that provides information about all the other containers within a docker box.


It's API is provided at

http://192.168.59.103:8080/api/v1.1/subcontainers/


Start manually using

    /usr/bin/docker run --name cadvisor -d --privileged=true  --volume=/var/run:/var/run:rw  --volume=/sys:/sys:ro  --volume=/var/lib/docker/:/var/lib/docker:ro  --publish=8080:8080  google/cadvisor:canary

(http://blog.tutum.co/2014/08/07/using-cadvisor-to-monitor-docker-containers/)  
(http://blog.tutum.co/2014/08/25/panamax-docker-application-template-with-cadvisor-elasticsearch-grafana-and-influxdb/)  
(https://github.com/GoogleCloudPlatform/heapster)  


### Links
[CoreOS](https://coreos.com/docs/)  
[Fleet](https://coreos.com/docs/launching-containers/launching/launching-containers-fleet/)  
[DigitalOcean Tutorial](https://www.digitalocean.com/community/tutorials/how-to-create-and-run-a-service-on-a-coreos-cluster)  

