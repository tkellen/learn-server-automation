provider "aws" {
  profile = "aevitas"
  region = "us-east-1"
}

resource "aws_route53_record" "main" {
  zone_id = "Z1WDJPK79MHL33"
  type = "A"
  name = "calm.team"
  ttl = "1"
  records = ["${aws_instance.main.public_ip}"]
}

resource "aws_security_group" "main" {
  name = "workshop"
  vpc_id = "vpc-da5b6ebc"
  egress {
    from_port = 0
    to_port = 0
    protocol = -1
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "main" {
  ami  = "ami-6871a115"
  subnet_id = "subnet-67e0f44a"
  instance_type = "t2.micro"
  key_name = "default"
  vpc_security_group_ids = ["${aws_security_group.main.id}"]
}
