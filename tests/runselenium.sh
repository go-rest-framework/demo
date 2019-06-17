#!/usr/bin/env bash

xvfb-run --server-args="-screen 0, 1366x768x24" selenium-standalone start
