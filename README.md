Site Layout: Bio Web Info
==
**Author:** Alexander Griffith

This repo holds the work in progress for the new [BioWebInfo] service.


Tools
--
* [BWA] - Read aligner.
* [MACS] - Peak detection.
* [Grid Engine]

Tasks
---

1. Integrate the front end application with the nodejs backend.
   - Need to integrate presistance and session management
   - Import temp figures to demonstrate the analysis components
   - Take the time to convert current web app to Angular
2. Finalize the AWS submit scripts
   - Optimize bid price for computation need
   - Do test runs on encode ChIP-Seq data to get timing down
3. Break BAM files down such that they can be distributed accross a HDFS

[Grid Engine]:http://gridscheduler.sourceforge.net/
[BioWebInfo]:http://biowebinfo.com
[MACS]:https://github.com/taoliu/MACS
[BWA]:https://github.com/lh3/bwa
[HDFS]:https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsUserGuide.html