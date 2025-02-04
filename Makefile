push.test.local:
	git push -f clone `git rev-parse --abbrev-ref HEAD`:test
