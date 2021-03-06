<?php
namespace LogMon\Tests\LogConfig;

class LogConfigMongoTest extends BaseLogConfigTest
{
	public $logConfigClass = '\LogMon\LogConfig\ConfigMongodb';
	public static $connectionFactory = 'db.mongodb.getConnection';
	public static $app;

	public function providerConfig()
	{
		$configSets = array(
			array(
				'host' => 'localhost',
				'port' => '3306',
				'username' => 'root',
				'password' => 'root',
				'auth' => true,
				'databaseName' => 'test',
				'collectionName' => 'logTable1',
				'fieldMapper' => (object) array(
					'unique' => (object) array('fieldName' => 'id', 'regex' => '(.*)'),
					'date' => (object) array('fieldName' => 'at', 'regex' => '(.*)'),
					'level' => (object) array('fieldName' => 'level', 'regex' => '(.*)'),
					'message' => (object) array('fieldName' => 'text', 'regex' => '(.*)')
				)
			)
		);

		return array($configSets);
	}

}
