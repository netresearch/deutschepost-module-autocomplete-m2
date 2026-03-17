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
use Monolog\LogRecord;

class ApiLogHandler extends System
{
    public function __construct(
        DriverInterface $filesystem,
        ExceptionHandler $exceptionHandler,
        private bool $loggingEnabled = true,
        private int $logLevel = Logger::ERROR
    ) {
        parent::__construct($filesystem, $exceptionHandler);
    }

    #[\Override]
    public function isHandling(LogRecord $record): bool
    {
        return $this->loggingEnabled && $record->level->value >= $this->logLevel && parent::isHandling($record);
    }
}
