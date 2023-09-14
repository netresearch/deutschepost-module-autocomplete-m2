<?php

/**
 * See LICENSE.md for license details.
 */

declare(strict_types=1);

namespace PostDirekt\Autocomplete\Model\Util;

use Magento\Framework\Filesystem\DriverInterface;
use Magento\Framework\Logger\Handler\Exception as ExceptionHandler;
use Magento\Framework\Logger\Handler\System;
use Monolog\Logger;

class ApiLogHandler extends System
{
    /**
     * @var bool
     */
    private $loggingEnabled;

    /**
     * @var int
     */
    private $logLevel;

    public function __construct(
        DriverInterface $filesystem,
        ExceptionHandler $exceptionHandler,
        bool $loggingEnabled = true,
        int $logLevel = Logger::ERROR
    ) {
        parent::__construct($filesystem, $exceptionHandler);

        $this->loggingEnabled = $loggingEnabled;
        $this->logLevel = $logLevel;
    }

    public function isHandling(array $record): bool
    {
        return $this->loggingEnabled && $record['level'] >= $this->logLevel && parent::isHandling($record);
    }
}
